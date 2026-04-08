# CLAUDE.md

Guidance for Claude Code (and other AI assistants) when working in this repository.

## Project Overview

This is a **Flappy Bird** clone implemented as a single-file React Native app using **Expo**. The entire game — components, state, game loop, collision detection, and styles — lives in `App.js`. UI strings are in Spanish (`Toca para jugar`, `Puntaje`, `Mejor`, `Toca para reiniciar`).

## Tech Stack

- **Expo** `~52.0.0` (managed workflow)
- **React Native** `0.76.5`
- **React** `18.3.1`
- **Babel preset**: `babel-preset-expo`
- No TypeScript, no linter, no test framework, no state library — plain JS + React hooks.

## File Layout

```
.
├── App.js            # Entire game (components, state, game loop, styles)
├── app.json          # Expo app config (name, slug, icons, splash, orientation)
├── babel.config.js   # Babel preset wiring for Expo
├── package.json      # Scripts and dependencies
└── assets/           # Referenced by app.json (icon.png) — not present in repo
```

There is intentionally no `src/`, `components/`, or `screens/` directory. Keep new code colocated in `App.js` unless a refactor is explicitly requested.

## Commands

```bash
npm install            # install dependencies
npm start              # expo start (Metro bundler + dev menu)
npm run android        # launch on Android emulator/device
npm run ios            # launch on iOS simulator/device
npm run web            # launch web build
```

There are no `test`, `lint`, `format`, or `build` scripts. Don't invent them or add tooling unless asked.

## Architecture

`App.js` exports a single default `App` component plus two presentational helpers:

- **`Bird({ y })`** — animated wrapper around the bird emoji (currently unused; the rendered bird lives inline in `App` via `birdContainer`).
- **`Pipe({ x, topHeight })`** — renders a top + bottom pipe pair separated by `PIPE_GAP`.
- **`App`** — owns all state and the game loop.

### Game Constants (top of `App.js`)

```js
BIRD_SIZE = 40
GRAVITY = 2
JUMP_FORCE = -12
PIPE_WIDTH = 60
PIPE_GAP = 180
PIPE_SPEED = 3
PIPE_SPAWN_INTERVAL = 2000  // ms
```

Tweak these for difficulty/feel. They are intentionally hard-coded module constants — do not promote them into config files or props unless asked.

### State Model

| State | Purpose |
|---|---|
| `gameState` | `'idle' \| 'playing' \| 'gameover'` — drives the main `useEffect` and overlay rendering |
| `score` / `bestScore` | Current run and session-best (not persisted) |
| `birdY` | Vertical position of the bird |
| `pipes` | Array of `{ x, topHeight, id, scored }` |
| `birdVelocity` (ref) | Mutable velocity, integrated each frame by `GRAVITY` |
| `animationFrame` (ref) | Holds the latest `requestAnimationFrame` id for cleanup |
| `pipeTimer` (ref) | `setInterval` handle for pipe spawning |
| `scoredPipes` (ref) | `Set` of pipe ids already counted, prevents double-scoring |

### Game Loop

A `useEffect` keyed on `gameState` runs only while `gameState === 'playing'`. It:

1. Starts a `setInterval` that pushes a new pipe with random `topHeight` every `PIPE_SPAWN_INTERVAL` ms.
2. Drives a `requestAnimationFrame` loop (`gameLoop`) that:
   - Applies gravity to `birdVelocity` and updates `birdY`.
   - Checks ceiling/floor collisions → `gameover`.
   - Moves pipes left by `PIPE_SPEED`, drops off-screen pipes.
   - Awards a point when a pipe's right edge passes the bird's left edge (using `scoredPipes` to dedupe).
   - Detects bird/pipe collision → `gameover`.
3. On unmount or state transition, cancels both the `requestAnimationFrame` and the `setInterval` in the cleanup function.

### Input

The whole screen is wrapped in a `TouchableWithoutFeedback` whose `onPress={jump}` handler:
- Starts a new game from `idle`
- Applies `JUMP_FORCE` to velocity while `playing`
- Restarts from `gameover`

### Rendering

Layered absolute-positioned `View`s: `sky` → `ground` → `pipes` → bird → score → idle/gameover overlay. All visual styling lives in the `StyleSheet.create({...})` block at the bottom of `App.js`.

## Conventions for Edits

- **Single-file by design.** Add new game features inside `App.js` next to related logic. Don't split into modules unless the user asks.
- **No new dependencies** without being asked. The current Expo/React Native versions are pinned and should not be bumped opportunistically.
- **Match the existing style**: 2-space indent, single quotes, semicolons, functional components, hooks-only, plain JS (no TS, no PropTypes).
- **Refs vs state**: use `useRef` for values that mutate every frame (velocity, timers, scored ids) and `useState` only for things that should re-render the UI.
- **State updaters**: when reading previous state inside the game loop, use the functional form (`setX(prev => ...)`) — there are several nested examples in `gameLoop` that must stay this way to avoid stale closures.
- **Spanish UI strings**: keep user-facing copy in Spanish to match the existing overlays.
- **`Bird` component is unused** — the bird is rendered inline inside `App`. If you touch bird rendering, decide deliberately whether to start using `Bird` or keep the inline version, and don't leave both wired up.
- **Assets**: `app.json` references `./assets/icon.png` but `assets/` is not in the repo. Don't fabricate binary assets; if an icon is required, ask the user to supply one.

## Git Workflow

- Active development branch for this task: `claude/add-claude-documentation-Z8mIv`.
- Repository: `lobo440/claude` (the only repo this assistant is authorized to touch via the GitHub MCP server).
- Commit with descriptive messages; push with `git push -u origin <branch>`.
- Do **not** open pull requests unless the user explicitly asks.

## Things Not To Do

- Don't add TypeScript, ESLint, Prettier, Jest, or any test/lint tooling unless requested.
- Don't restructure into `src/components/...` — the single-file layout is intentional.
- Don't persist `bestScore` to AsyncStorage or add new dependencies on a whim.
- Don't change the game constants for "balance" without being asked.
- Don't translate the Spanish UI strings.
