# Adding cognitive game kinds

Game definitions are JSON round arrays stored in `cognitive_games.rounds`. Keep existing `grid`, `motion`, and `choice` keys and fields unchanged so saved games continue to load.

## Current round formats

Every round has `kind` and a non-empty `prompt`. The admin editor includes a JSON example for each registered kind and validates the full array before saving.

| Kind | Additional JSON fields | Student response and scoring |
| --- | --- | --- |
| `grid` | `cells`: tile indexes 0–8 | Ordered tile sequence must match |
| `motion` | `path`: lane indexes 0–3 | Final selected lane must match |
| `choice` | `choices`: strings, `answer`: zero-based index | Selected index must match |
| `sequence_memory` | `sequence`, `choices`: string arrays | Reproduced token sequence must match |
| `target_detection` | `target`, `items`: string array | Selected target indexes must match |
| `match_mismatch` | `stimulusA`, `stimulusB`, `isMatch`: boolean | Match/mismatch response must match |
| `number_series` | `sequence`: numbers, `choices`, `answer` | Selected continuation must match |
| `pattern_completion` | `pattern`, `choices`, `answer` | Selected completion must match |
| `rule_switching` | `instruction`, `stimulus`, `choices`, `answer` | Rule-based selection must match |
| `spatial_rotation` | `shape`: display rows, `choices`, `answer` | Selected rotated shape must match |
| `rapid_classification` | `stimulus`, `choices`, `answer` | Selected category must match |
| `coding_decoding` | `instruction`, `encoded`, `choices`, `answer` | Decoded option must match |
| `reaction_time` | `targetDelayMs`, `maxResponseMs` | A tap within the response window earns the point |
| `go_no_go` | `stimuli`, `goStimulus` | Exact set of go taps, with no false alarms |
| `path_tracking` | `path`: tile indexes 0–8 | Reproduced path order must match |

## Extension steps

1. Add the kind ID, a typed round shape, an example, client JSON validator, and client response scorer in `frontend-v2/src/lib/game-kind-registry.ts`.
2. Add the student stimulus/response interface in `frontend-v2/src/components/games/GameKindRound.tsx`. `GamePlayer` already routes non-legacy kinds to this component and stores its typed response; keep `grid`, `motion`, and `choice` routed through their current views.
3. Add the matching server validation and response scoring cases in `backend-nestjs/src/games/game-kind-registry.ts`. The server computes scores from the saved game definition when response data is present.
4. Add the JSON example to the registry example tests and add validation, scoring, and UI coverage for the new kind.
5. Run the frontend TypeScript check, focused ESLint and Jest checks, plus backend Jest and build checks.

Adding a kind does not require changing the game player flow, admin CRUD API, or attempt table. The JSONB round and response columns hold kind-specific data while attempt metadata stays indexed per student and game.
