# Active Context

## Current Focus
- Implementation of the **Modern View** and **Dark Mode**.
- Refining the layout to be side-by-side (Track + Uma) on desktop and stacked on mobile.
- Fixing styling regressions (oversized buttons, text readability in dark mode).

## Recent Changes
- **Refactoring**: Extracted `ClassicLayout` from `app.tsx`.
- **New Features**:
    - Created `ModernLayout.tsx` (Glassmorphism, no IntroText).
    - Created `ModernLayout.css` (Styles, Dark Mode variables).
    - Added View and Dark Mode toggles to `App` in `app.tsx`.
- **Layout Improvements**:
    - Changed Modern View to use a flexible side-by-side layout for Race Track and Umamusume Details on large screens.
    - Moved Controls to a separate panel to prevent overlap.
    - Added responsive CSS scaling for `RaceTrack` and `HorseDef` to fit available width.
    - Constrained button image sizes in Modern View.
- **Build**: Updated `umalator-global` by running the build script.
- **Deployment**: Pushed changes to GitHub.

## Active Decisions
- **State Management**: `App` component in `app.tsx` retains all simulation state and passes it to Layouts via `LayoutProps`.
- **CSS Strategy**: `ModernLayout.css` uses CSS variables for Dark Mode and scoped classes. Overrides legacy inline styles where necessary using `!important`.
- **Responsive Design**: Prioritize "Side-by-Side" for desktop as per user request, but fallback to wrapping/stacking on smaller screens.

## Next Steps
- Verify the deployment on GitHub Pages.
