# PracticalOS — Practical Workspace Dashboard

PracticalOS is a responsive dashboard that brings the six practicals in this folder together. It provides searchable project cards, technology filters, favorites, completion tracking, recent projects, launch instructions, theme switching, and live health checks for the three server-based practicals.

## Included practicals

| Folder | Project | How it runs |
|---|---|---|
| `practical-1-restaurant` | Restaurant landing page | Static HTML/CSS |
| `practical-2-ecommerce` | E-commerce catalog | Static HTML/CSS |
| `practical-3-portfolio` | Developer portfolio | Static HTML/CSS/JS |
| `practical-4-authentication` | Login and registration | Node.js, Express, PostgreSQL |
| `practical-5-news-portal` | EJS news portal | Node.js, Express, EJS |
| `practical-6-student-profile` | React student directory | Node.js, Express API, browser React |

## Start the dashboard

**Requirement:** Node.js 18 or later. The dashboard itself has no third-party npm dependencies.

1. Extract the ZIP.
2. Open a terminal in the extracted `das` folder.
3. Run:

   ```bash
   npm start
   ```

4. Open **http://localhost:3000** in your browser. On Windows, you can instead double-click `START-DASHBOARD.bat` to start the hub and open the page.

The dashboard server serves the existing practical files and exposes `/api/status` to check the backend projects on ports 3001, 3002, and 3003. You can also open `index.html` directly, but live status checks require the local hub server.

## Start an individual practical

Practical 1, 2, and 3 are static projects. Open the project from the dashboard or open their `index.html` files.

Practical 4, 5, and 6 each have their own Node.js server. Open a **separate terminal** for each one you want to run:

```bash
# Practical 4 — Authentication (port 3001)
cd practical-4-authentication
npm install
# Copy .env.example to .env and set your local PostgreSQL connection values.
npm start
```

```bash
# Practical 5 — News portal (port 3002)
cd practical-5-news-portal
npm install
npm start
```

```bash
# Practical 6 — Student profiles (port 3003)
cd practical-6-student-profile
npm install
npm start
```

Run each command from the extracted project's root folder (for Windows, open a new terminal per server). For Practical 4, PostgreSQL must be installed and running and `DB_PASSWORD` in your local `.env` must be configured. Use `.env.example` as the template. Do not share your `.env` file or commit database passwords.

## Dashboard controls

- Search by project name, technology, or description.
- Filter by Frontend, Full-stack, React & API, Favorites, or Completed.
- Toggle between card and list layouts.
- Star favorites and mark work complete; these preferences are saved in this browser with `localStorage`.
- Use **Details** on a project to view its features and copy the launch command.
- Refresh local server status from the right-hand panel.
- Use the moon/sun button to change theme. The interface honors reduced-motion preferences.

## Design and implementation notes

The dashboard uses semantic HTML, CSS custom properties, responsive grid/flex layouts, a small set of purposeful transitions, reduced-motion support, keyboard shortcuts (`Ctrl/Cmd + K` to focus search and `Esc` to close dialogs), and a minimal Node.js HTTP server without adding dependencies to the workspace root.

The dashboard is implemented with vanilla HTML, CSS, and JavaScript to keep setup light and to work alongside the project's existing HTML/EJS/React examples. The requested agent-skill install commands are not runtime dependencies for this app; see the source repositories if you want to add those agent skills to your own coding environment:

```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx ui-skills
npx skills add https://github.com/shadcn/improve --skill improve
npx skills add https://github.com/emilkowalski/skills --skill improve-animations
```

## Packaging note

`node_modules` directories are intentionally not bundled; install dependencies inside each Node-based practical as needed. A `.env` file is also intentionally excluded because it may contain local credentials. The supplied `.env.example` remains the safe configuration template.
