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
- **Modern Polish**:
    - Track + Uma panels now live inside a shared `main-content-row` so they stay side-by-side on desktop while stacking gracefully on mobile.
    - Dark Mode dropdowns (track select, course select, Uma suggestions, aptitude/mood pickers) gained readable backgrounds and option colors.
- **Follow-up Tweaks**:
    - Re-ordered the Modern layout so the Umamusume panel sits on the left and the track/controls/results sit on the right with responsive ordering on mobile.
    - Regenerated both `umalator` and `umalator-global` bundles so GitHub Pages (umalator-global) reflects the new styling.
    - Restored the Skill Chart helper list (`baseSkillsToTest`) so running Skill Chart no longer throws at runtime.
    - Converted the Modern layout’s main row to a responsive CSS grid to eliminate residual overlap between the Uma and Track panels.
- **Layout Fix**: Ensured `.app-container` spans the entire `#app` grid so the Modern layout can use the full browser width on `umalator-global`.
- **Build**: Updated `umalator-global` by running the build script.
- **Deployment**: Pushed changes to GitHub.

## Active Decisions
- **State Management**: `App` component in `app.tsx` retains all simulation state and passes it to Layouts via `LayoutProps`.
- **CSS Strategy**: `ModernLayout.css` uses CSS variables for Dark Mode and scoped classes. Overrides legacy inline styles where necessary using `!important`.
- **Responsive Design**: Prioritize "Side-by-Side" for desktop as per user request, but fallback to wrapping/stacking on smaller screens.

## Next Steps
- Verify the deployment on GitHub Pages.
