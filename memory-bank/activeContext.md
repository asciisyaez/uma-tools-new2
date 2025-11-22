# Active Context

## Current Focus
- Implementation of the **Modern View** and **Dark Mode**.
- Ensuring the `umalator-global` build is correctly updated from `umalator` source.

## Recent Changes
- **Refactoring**: Extracted `ClassicLayout` from `app.tsx`.
- **New Features**:
    - Created `ModernLayout.tsx` (Glassmorphism, no IntroText).
    - Created `ModernLayout.css` (Styles, Dark Mode variables).
    - Added View and Dark Mode toggles to `App` in `app.tsx`.
- **Build**: Updated `umalator-global` by running the build script to include new features.
- **Deployment**: Pushed changes to GitHub.

## Active Decisions
- **State Management**: `App` component in `app.tsx` retains all simulation state and passes it to Layouts via `LayoutProps`.
- **CSS Strategy**: `ModernLayout.css` uses CSS variables for Dark Mode and scoped classes for the modern view to avoid breaking the Classic view.
- **IntroText**: Explicitly removed from Modern View to reduce clutter.
- **Mobile Layout**: Modern View uses a vertical stack (flex-col/grid-1col) on screens < 900px.

## Next Steps
- Verify the deployment on GitHub Pages (user action).
- Monitor for any styling regressions in Classic View (though none expected due to isolation).

