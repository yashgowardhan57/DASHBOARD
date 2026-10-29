# PracticalOS dashboard — design notes

## Direction

A calm, editorial project workspace: deep evergreen navigation, warm off-white canvas, crisp ink typography, and a restrained lime accent for progress and primary actions. The dashboard is designed to feel like a practical tool rather than a marketing page, with a persistent sidebar, clear content hierarchy, a compact statistics row, and a project collection that is easy to scan.

## Tokens

- Canvas: `#f5f5f1`
- Surface: `#ffffff`
- Primary ink: `#19221e`
- Sidebar: `#17211d`
- Accent: `#c6ef61`
- Supporting accent colors: muted peach, lilac, blue, rose, and sand for project identity only
- Typography: Manrope for display/UI headings; DM Sans for body text
- Geometry: 8–22px radii depending on component scale; fine low-contrast borders; soft, restrained shadows

## Interaction principles

- Keep motion purposeful: card lift on hover, controlled entrance transitions, a slow ornamental hero motif, clear state feedback, and a short toast for actions.
- Respect `prefers-reduced-motion` and preserve keyboard access. `Ctrl/Cmd + K` focuses project search; `Escape` closes the dialog or mobile navigation.
- Use instant feedback for favorites, progress, filters, and layout controls. Save only local workspace preferences in the current browser.
- Do not pretend that browser code can start an operating-system process. Show copyable terminal commands for backend practicals and report whether those servers are actually reachable.
- Keep the dashboard usable offline apart from optional external font delivery and Practical 6's existing React/Babel CDN dependencies.

## Responsive behavior

- Desktop: persistent sidebar, two-column project collection and utility rail.
- Tablet: collapsible sidebar and a single project/utility column when needed.
- Mobile: off-canvas navigation, single-column cards, compact filters, and stacked utility panels.

## Stack decision

The existing practicals use different approaches, so the new dashboard is deliberately built with semantic HTML, CSS, and vanilla JavaScript rather than adding a new framework to the whole repository. The local launcher uses Node's built-in HTTP APIs only.
