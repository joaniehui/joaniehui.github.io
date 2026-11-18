# Engineering Portfolio

A minimal, line-sketch engineering portfolio themed like a record collection. Every project is a vinyl on a shelf: hover to slide the record out, click to "play" it and open its photos and tracklist.

There's no build step and nothing to install. It's just HTML, CSS and JavaScript.

```
portfolio/
├── index.html          ← page structure (no need to edit)
├── css/style.css       ← colors, fonts, layout
├── js/config.js        ← ★ ALL YOUR CONTENT GOES HERE ★
├── js/main.js          ← renders the page from config.js
├── images/
│   └── projects/       ← put your project photos here
└── assets/
    └── resume.pdf      ← optional: add your résumé
```

## 1. Make it yours

Open **`js/config.js`** and replace the example content:

- **Identity:** name, role, tagline, email, socials
- **specs:** a fun "spec sheet" about you (operating temperature, fuel, failure modes…)
- **interests:** what you nerd out about (any emoji works as the icon)
- **projects:** one entry per project (see below)
- **skills:** your toolbox, grouped however you like

### Adding a project with photos

1. Copy your photos into `images/projects/`, for example `images/projects/robot-arm-1.jpg`.
2. Add an entry to the `projects` list:

```js
{
  title: "My Cool Project",
  category: "Robotics",              // filter buttons are made from these
  year: 2026,
  summary: "One line for the card.",
  description: [
    "First paragraph shown when someone opens the project.",
    "Second paragraph. Add as many as you like.",
  ],
  images: [
    { src: "images/projects/robot-arm-1.jpg", caption: "Final build" },
    "images/projects/robot-arm-2.jpg",        // a caption is optional
  ],
  stats: [ { label: "Weight", value: "1.2 kg" } ],   // optional
  tags: ["SolidWorks", "Arduino"],
  links: [ { label: "GitHub", url: "https://github.com/..." } ],  // optional
},
```

The first image becomes the album cover on the shelf. Until you add photos, each record shows a line-art cover. Landscape photos (about 4:3) look best.
Keep each photo under about 500 KB so the page loads fast. [squoosh.app](https://squoosh.app) is a free way to shrink them.

### Changing the look

- In `config.js`, set `accent: "#00e5a0"` (or any color) to change the highlight color.
- Fonts and everything else are set at the top of `css/style.css`.

## 2. Preview locally

Double-click `index.html`. It opens in your browser, with no server needed.

## 3. Publish free with GitHub Pages

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main

# Create an empty repo on github.com first, then:
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

Then on GitHub, go to **Settings → Pages → Build and deployment**, set **Source** to *Deploy from a branch*, and choose **main** and **/ (root)**.

If you named the repo `YOUR-USERNAME.github.io`, your site goes live at `https://YOUR-USERNAME.github.io` within a minute or two.
With any other repo name, it's at `https://YOUR-USERNAME.github.io/REPO-NAME`.

### Updating later

```bash
git add .
git commit -m "Add new project"
git push
```

## Little extras built in

- Arrow keys flip through photos in the project viewer, and Esc closes it.
- Animations turn off if the visitor's system is set to reduce motion.
- Open the browser console for a hidden message. You can edit it with `consoleMessage` in `config.js`.
