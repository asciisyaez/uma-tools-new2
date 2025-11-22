# System Patterns

## Architecture
- **Frontend**: Preact (React-like) with TypeScript.
- **Build System**: `esbuild` via `node build.mjs`.
- **Deployment**: GitHub Pages serving the `umalator-global` directory.
- **Simulation**: Web Workers (`simulator.worker.ts`) handle heavy computation to keep UI responsive.

## Directory Structure
- `umalator/`: Source code for the simulator UI and logic.
    - `app.tsx`: Main entry point and state container.
    - `ClassicLayout.tsx`: The legacy UI component.
    - `ModernLayout.tsx`: The new responsive UI component.
    - `simulator.worker.ts`: Simulation logic worker.
- `umalator-global/`: Deployment target.
    - `build.mjs`: Build script (configured to build from `../umalator` to `.`).
    - `bundle.js`, `bundle.css`: Generated artifacts.
    - `index.html`: Entry HTML.
- `uma-skill-tools/`: Core simulation logic and data.
- `components/`: Shared UI components (`RaceTrack`, `HorseDef`, etc.).

## Key Design Decisions
- **Separation of Concerns**: `App` handles logic/state; `ClassicLayout` and `ModernLayout` handle presentation.
- **Shared Components**: Both layouts reuse `HorseDef`, `RaceTrack`, `BasinnChart`, `WitVarianceSettingsPopup`.
- **Props Interface**: `LayoutProps` defines the contract between `App` and Layouts.
- **Global Build**: The project is structured such that `umalator-global` is a distinct "package" that consumes `umalator` source.

## Design Patterns
- **Container/Presenter**: `App` is the container; Layouts are presenters.
- **Glassmorphism**: Used in Modern View (backdrop-filter, translucent backgrounds).
- **Dark Mode**: Implemented via CSS variables (`--bg`, `--fg`, `--card`) and a `.dark` class on `html`/`body`.

