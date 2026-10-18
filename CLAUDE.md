# Project notes for Claude

## Mobile editing rules
Whenever I ask for a change to the mobile or phone view, it must look good on ALL phone sizes, not just the one I mention. Fixing one screen must never break another.

1. Test every mobile change at these widths: 360px (small Android), 390px (iPhone), 412px (Galaxy Z Fold 7 cover screen / most Androids), and 430px (large iPhone). Also check the in-between size 601–900px (e.g. Z Fold unfolded, tablets) so it doesn't look broken there.
2. Also test with larger text (browser font size around 125%) so nothing overlaps or gets cut off when users have bigger text settings.
3. Use flexible layouts: percentages, max-width, flex/grid wrapping, and relative units (rem, em, clamp()). Avoid fixed pixel widths, heights or positions that only suit one screen.
4. Never use fixed heights that clip content. Boxes should grow to fit their text.
5. Put phone-only changes in mobile.css. Don't change the desktop look unless I specifically ask.
6. Before saying a mobile change is done, tell me which widths you tested and confirm nothing overlaps, overflows, or gets cut off at any of them.
7. Don't push until I've checked it with Go Live and said "push".
