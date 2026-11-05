# Security review: ScriptedAlchemy/grok-bot-cli (v0.12.5)

> Static review only, in Polish. Verdict: **use with care** — fine for the hackathon on a dedicated account.

Data: 2026-11-05 · Metoda: wyłącznie analiza statyczna (repo @ `96079db` + opublikowany tarball npm `grok-bot-cli@0.12.5`). Nic nie zostało uruchomione ani zainstalowane.

## Werdykt: **OSTROŻNIE** (OK do użycia na hackathonie, z zastrzeżeniami poniżej)

Nie znalazłem nic złośliwego: brak telemetrii, brak nieznanych domen, brak hooków instalacyjnych, brak runtime-zależności. Główne ryzyko nie jest „malware”, tylko **model uwierzytelniania**: CLI odszyfrowuje z dysku pełny token sesji aplikacji desktopowej Grok Bot (pełny dostęp do konta, bez scope'ów) i korzysta z **nieoficjalnego, prywatnego API**.

## 1. Autor i repo
| | |
|---|---|
| Autor | **Zack Jackson** (GitHub `ScriptedAlchemy`, konto od 2017, ~3k followers; bio: „Inventor & co-creator of Module Federation”, maintainer Webpack/Rspack). Commity z `zackary.l.jackson@gmail.com`; maintainer npm `zackljackson` – ten sam email → spójne. |
| Repo | utworzone 2026-08-19, ostatni push 2026-11-04, ~220 commitów, **167★, 36 forków**, 8 open issues, MIT, nie fork, nie archiwalne |
| Aktywność | bardzo aktywne (merge kilkunastu PR 2026-11-03, Renovate, changesets, CI) |
| Status | **Nieoficjalne** – projekt społecznościowy; nie jest produktem dostawcy Grok Bota. Korzysta z prywatnych endpointów aplikacji desktopowej (mogą się zmienić bez ostrzeżenia). |

## 2. Credentiale / tokeny
- **Nie prosi o token** – czyta zaszyfrowane dane zalogowanej aplikacji desktop Grok Bot (`src/core/app-session.js`):
  - Windows: `%APPDATA%\Grok Bot\sand-secrets.json` (pole `cursor-access-token`, `cursor-selected-team-id`) + `gateway-descriptor.json`; klucz AES z `Local State` odwijany przez **DPAPI** (wywołuje `powershell.exe -NoProfile -NonInteractive` z `ProtectedData.Unprotect`, scope CurrentUser).
  - macOS: Keychain (`security find-generic-password "Grok Bot Safe Storage"`), Linux: `secret-tool`.
  - To jest dokładnie technika „cookie stealera” z Chromium/Electron – tu użyta legalnie do własnej sesji, ale oznacza: **CLI ma pełny token konta** (nie da się go ograniczyć).
- Bierze tylko konto oznaczone jako aktywne; odmawia, gdy aktywne konto się zmieni.
- Alternatywnie env: `CURSOR_ACCESS_TOKEN`, `CURSOR_API_BASE_URL`, `SAND_CLIENT_VERSION`. Kod wprost mówi, że **klucze API z dashboardu nie działają** – potrzebny token sesji.
- **Nie zapisuje tokenów** na dysk. Zapisuje historię wiadomości (plaintext) do `~/.grok-bot-cli/history.jsonl` (chmod 600) – role + tekst wiadomości.
- Ochrona przed wyciekiem: `src/core/url-policy.js` – token wysyłany tylko po **https** do `*.cursor.sh` / `*.cursor.com` (backend) i dodatkowo `*.cursorvm.com` (gateway sandboxa). Redakcja tokenów w logach/błędach. Wyjątki tylko przez jawne env `GROK_BOT_ALLOW_LOCAL_GATEWAY=1` / `GROK_BOT_ALLOW_ANY_GATEWAY=1` – **nie ustawiać**.

## 3. Ruch sieciowy (wszystkie hosty)
| Host | Po co |
|---|---|
| `https://api2.cursor.sh/aiserver.v1.GrokBotService/EnsureSandBox` | pobranie URL+tokenu gatewaya (backend Grok Bota; z kodu wynika, że Grok Bot działa na infrastrukturze Cursor) |
| `https://<id>-pod-<id>.<region>.cursorvm.com/api/<method>` (lub URL z descriptora apki) | właściwe API gatewaya: `listAgents`, `createAgent`, `updateAgent`, `deleteAgent`, `createGroup`, `setGroupMembers`, `sendPrompt`, `getAgentThread`, `getAgentTranscriptTail`, `getAgentWorkflows`, `importAgentWorkflowText`, `deleteAgentWorkflow`, `setAgentHiddenFromSidebar`, `setAgentNotifyOnUpdates` |
| `127.0.0.1:<port>` (opcjonalnie) | moduł `chatgpt-desktop` – CDP do lokalnej aplikacji ChatGPT Desktop (tylko macOS, tylko na żądanie) |
| lokalne sockety / named pipe | daemon relay + kanał Claude (IPC, bez sieci) |

Pozostałe URL-e w bundlu (json-schema.org, raw.githubusercontent ajv, gist/codeload w `hosted-git-info`, registry.npmjs.org w `npm-package-arg`, docs Claude/OpenAI/React) to **stringi bibliotek/dokumentacji**, nie są wywoływane w normalnej pracy. **Brak telemetrii** (grep: sentry/posthog/segment/mixpanel/datadog/analytics – 0). **x.ai nie występuje nigdzie.**

`eval` / `new Function` w bundlu: tylko React dev-check (`(0,eval)("null")`) i kompilator schematów Ajv – standard, nie pobiera i nie wykonuje zdalnego kodu.

## 4. Skrypty, procesy, pliki
- `package.json` opublikowany: **brak `preinstall`/`install`/`postinstall`**, **zero `dependencies`** (wszystko zbundlowane rspackiem). `prepack` działa tylko u autora przy publikacji.
- Brak binarek natywnych. Bundle ~17 MB, nie zaciemniony (czytelny output rspack), ale **nie da się go 1:1 zweryfikować z `src/`** bez ponownego builda – build używa `agent-bundle` z `pkg.pr.new` (preview build innego repo tego samego autora) + `.npmrc allow-remote=all`. To ryzyko supply-chain po stronie autora, nie usera.
- `child_process`: PowerShell DPAPI (Win), `security`/`secret-tool`/`PlistBuddy` (mac/Linux), spawn własnego workera relay (`process.execPath`), uruchamianie Codex CLI w komendach `codex`, `osascript`/`open` do relaunchu ChatGPT (mac).
- Pliki poza swoim katalogiem: czyta `%APPDATA%\Grok Bot\*` i `~/.grokbot/*`; **zapisuje** `~/.grok-bot-cli/`, a opcjonalne komendy: `gbot-install` (rejestruje plugin/MCP w Claude Code / Cursor / Codex, `~/.agent-bundle/`), `codex desktop-shim` (zapisuje shim do `~/.codex` + macOS LaunchAgent plist). Dotykają konfiguracji innych narzędzi – **nie uruchamiać, jeśli niepotrzebne**.

## 5. Zależności
- Runtime: brak (bundle). Dev: `@changesets/cli`, `@modelcontextprotocol/server`, `@rstest/core`, `typescript`, `react`, `zod` – znane paczki, brak typosquattingu.
- Jedyne nietypowe: `agent-bundle` i `@agent-bundle/runtime` z `pkg.pr.new` (pinned do commita, repo `ScriptedAlchemy/agent-bundle` – ten sam autor). Dotyczy tylko builda.

## 6. Co to robi (dla hackathonu)
CLI + serwer MCP do **programowego sterowania botami Grok Bot na Twoim koncie**: tworzenie/edycja/usuwanie botów (nazwa, instrukcje/description, avatar, notyfikacje), grupy botów, **wysyłanie promptów do bota lub grupy** (`gbot send`), odczyt wątków/transkryptów z pollingiem (`gbot thread --after ID --json`), zarządzanie biblioteką skilli (SKILL.md). Wyjście `--json` → **tak, da się nim sterować botami ze skryptu/naszej aplikacji** (shell-out do `gbot … --json` albo MCP `grok-bot` dla Claude Code/Cursor/Codex). Dodatkowo mosty do Codex/ChatGPT Desktop/Claude (nam raczej zbędne).

## Jak uruchomić bezpiecznie (Windows 11)
1. **Dedykowane konto Grok Bot na hackathon** (nie główne/płatne z danymi), zalogowane w desktop app – CLI weźmie jego sesję. Brak opcji tokenu o ograniczonych uprawnieniach.
2. Zainstaluj przypiętą, przejrzaną wersję: `npm i -g grok-bot-cli@0.12.5 --ignore-scripts` (Node ≥ 22.19). Nie używaj `@latest` w trakcie hackathonu (aktywne repo, kod może się zmienić).
3. Używaj tylko `gbot bots|groups|send|thread|skills`. **Nie** odpalaj `gbot-install`, `codex desktop-shim`, relay/bridge, `chatgpt-desktop`, chyba że świadomie.
4. Nie ustawiaj `GROK_BOT_ALLOW_ANY_GATEWAY` / `GROK_BOT_ALLOW_LOCAL_GATEWAY`.
5. Po hackathonie: `npm rm -g grok-bot-cli`, usuń `%USERPROFILE%\.grok-bot-cli\` (historia rozmów), wyloguj sesję w apce, jeśli konto współdzielone.
6. Pamiętaj: prywatne API → może przestać działać po aktualizacji desktop app; ewentualnie ToS dostawcy. Miej plan B w demo (nagrany fallback).
