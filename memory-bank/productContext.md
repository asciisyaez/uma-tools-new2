# Product Context

## Purpose
This project serves the Uma Musume community by providing a tool ("Umalator") to simulate and analyze race performance. It helps players optimize their characters ("Umamusume") for competitive modes like Champions Meeting and League of Heroes.

## Problems Solved
- **Complexity**: The game's race mechanics are opaque. This tool visualizes them.
- **Comparison**: Players need to compare different builds/skills to see which performs better.
- **Accessibility**: The "Classic" view is functional but dense. The "Modern" view aims to be more accessible and mobile-friendly.

## How It Works
- Users input race parameters (course, weather, etc.) and horse stats/skills.
- The simulation runs (using web workers) to generate race results.
- Results are displayed as basin charts (distance difference), velocity graphs, and statistical summaries.
- `umalator` contains the source code.
- `umalator-global` contains the built assets served via GitHub Pages.

## User Experience Goals
- **Classic View**: Dense, information-rich, desktop-oriented (existing users).
- **Modern View**: Responsive, vertically stacked on mobile, dark mode support, "Apple liquid glass" aesthetic (new/mobile users).
- **Seamless Switching**: Users can toggle between views instantly.

