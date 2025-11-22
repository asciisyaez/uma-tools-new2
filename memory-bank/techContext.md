# Tech Context

## Stack
- **Language**: TypeScript, JavaScript (ESModules).
- **Framework**: Preact (via `preact/compat` or direct usage).
- **Bundler**: esbuild.
- **Visualization**: D3.js.
- **Runtime**: Node.js (for build scripts).
- **Shell**: PowerShell (User's environment).

## Development Environment
- **Workspace**: `umalator-global` and `umalator` are sibling directories but logically `umalator-global` depends on `umalator`.
- **Build Command**: `cd umalator-global; node build.mjs`.
- **Package Management**: npm.

## Technical Constraints
- **Performance**: Simulation is CPU intensive; must use Web Workers.
- **Compatibility**: Must support modern browsers (Glassmorphism requires `backdrop-filter`).
- **Legacy Support**: Classic view must remain pixel-perfect (or close to it) for existing users.
- **Deployment**: Must be served as static files on GitHub Pages.

## Dependencies
- `preact`, `preact-i18n`
- `d3`
- `esbuild` (dev/build)
- `immutable`

