# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common Commands

### Web Applications (Umalator, Skill Visualizer, etc.)
The web applications are structured with a source directory (e.g., `umalator`) and a global/deployment directory (e.g., `umalator-global`).

*   **Build Umalator**:
    ```bash
    cd umalator-global
    node build.mjs
    ```
    *   This uses `esbuild` to bundle `umalator/app.tsx` and dependencies into `umalator-global/bundle.js`.
    *   The build script also copies necessary assets.

*   **Build Skill Visualizer**:
    ```bash
    cd skill-visualizer-global
    node build.mjs
    ```

### CLI Tools (`uma-skill-tools`)
The core simulation logic and CLI tools are located in `uma-skill-tools`.

*   **Install Dependencies**:
    ```bash
    cd uma-skill-tools
    npm install
    ```

*   **Run CLI Tools**:
    Use `npx ts-node` to run the TypeScript tools directly.
    ```bash
    cd uma-skill-tools
    npx ts-node tools/gain.ts --help
    npx ts-node tools/skillgrep.ts --help
    ```

## Architecture & Structure

This repository follows a monorepo-like structure containing multiple web applications and a shared core library.

### Key Directories
*   **`uma-skill-tools/`**: The core TypeScript library for simulating races and analyzing skill effects. Contains the logic for `RaceSolver`, `ConditionParser`, etc.
    *   `tools/`: CLI tools (`gain.ts`, `skillgrep.ts`, `dump.ts`) for analysis and debugging.
*   **`umalator/`**: Source code for the main "Umalator" web application.
*   **`umalator-global/`**: The build target and deployment directory for Umalator. Serves as the GitHub Pages root for the app. Contains `build.mjs`.
*   **`skill-visualizer/`** & **`skill-visualizer-global/`**: Source and build directories for the Skill Visualizer app.
*   **`components/`**: Shared Preact components used across the web apps (e.g., `HorseDef.tsx`, `RaceTrack.tsx`).
*   **`memory-bank/`**: Documentation and context files (`productContext.md`, `techContext.md`, `activeContext.md`) describing the project's purpose, stack, and state.

### Technology Stack
*   **Framework**: Preact (via `preact/compat` or direct usage).
*   **Bundler**: `esbuild` (invoked via `node build.mjs`).
*   **Visualization**: `d3` (for charts and graphs).
*   **Runtime**: Node.js (for build scripts and CLI tools).
*   **Languages**: TypeScript and JavaScript (ESModules).

### Development Patterns
*   **Web Workers**: The simulation is CPU-intensive and runs in a Web Worker (`simulator.worker.js`) to avoid blocking the UI.
*   **Static Deployment**: The apps are designed to be served as static files on GitHub Pages. The `*-global` directories contain the artifacts ready for deployment.
*   **Shared Logic**: `uma-skill-tools` is the source of truth for simulation logic. Changes here affect both CLI tools and web apps.

## Context Resources
*   **`memory-bank/productContext.md`**: User goals, problem statements, and features (Classic vs. Modern view).
*   **`memory-bank/techContext.md`**: Technical constraints, detailed stack info, and build instructions.
*   **`memory-bank/activeContext.md`**: Recent changes, current focus (e.g., Modern View implementation), and next steps.
