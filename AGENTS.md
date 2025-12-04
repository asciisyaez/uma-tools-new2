# Repository Guidelines

## Project Structure & Module Organization
This repo hosts several standalone Preact/TypeScript surfaces. `umalator`, `umalator-global`, `skill-visualizer`, `skill-visualizer-global`, `build-planner`, `courseimages`, and `roguelike` each contain an `app.tsx`, local build script, and emitted `bundle.*` artifacts; keep generated bundles out of review unless you intentionally rebuild. Simulation logic, data transforms, and CLIs live under `uma-skill-tools/`, while reusable UI sits in `components/` and vendored `@tanstack/table-core` sources are mirrored in `vendor/`. Shared datasets (`umas.json`, `skill_meta.json`, `strings/`, icon/font folders, `umalator-global/courseeventparams/*.json`) are consumed by multiple apps—update them atomically and document rationale in `memory-bank/*.md`.

## Build, Test, and Development Commands
- `npm install` (root) installs shared dependencies for esbuild-based builds.
- `node umalator/build.mjs --debug` or `node build-planner/build.mjs` bundles a single surface; omit `--debug` for release assets.
- `node skill-visualizer-global/build.mjs --serve 8000` runs the built-in dev server with on-demand rebuilds; open `http://localhost:8000`.
- `npx ts-node uma-skill-tools/tools/ToolCLI.ts --help` lists data tooling for regenerating course/skill tables before exporting bundles.

Always run commands from the repo root so relative paths inside the scripts resolve correctly.

## Coding Style & Naming Conventions
Source is TypeScript targeting ES2018 with `jsxFactory` set to `h`, so prefer Preact function components and hooks over class components. Use hard tabs, single quotes, and `const` + `Object.freeze` for immutable tables (see `uma-skill-tools/RaceSolver.ts`). Namespaces and PascalCase types capture simulator concepts; camelCase functions and snake_case JSON keys keep parity with in-game IDs. Run `npx esbuild ... --log-level=warning` locally if you add new entry points to ensure bundler diagnostics stay clean.

## Testing Guidelines
Automated tests live in `uma-skill-tools/test`. Use `cd uma-skill-tools && npx ts-node test/race.ts` for deterministic solver checks and `npx ts-node test/regression/check.ts --fast` for comparing against the latest checkpoint; regenerate baselines with `test/regression/create-checkpoint.ts` only when physics changes are intentional. Front-end work requires manual smoke tests by launching the relevant dev server plus verifying worker output (`simulator.worker.ts`) in the browser console. Keep failure logs (e.g., `--failure-log tmp.json`) out of source control.

## Commit & Pull Request Guidelines
Recent history favors short, imperative summaries such as “Fix skill chart runtime and modern grid layout.” Follow that tone, mention the affected surface first, and group generated bundle changes in the same commit as the source diff. Every PR should describe reproduction steps, the build command used, and screenshots for UI adjustments; link issues or `memory-bank` cards when applicable. Request review before copying artifacts to GitHub Pages, and note any data migrations touching shared JSON so downstream consumers can react.
