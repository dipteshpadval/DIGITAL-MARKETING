# Urban Admark

A static website for Urban Admark featuring landing, services, AI, case studies, about, and contact pages.

## Quick start
- Open `index.html` directly in your browser, or
- Serve the folder via a local web server to avoid CORS issues:
  - PowerShell (Python): `python -m http.server 5500`
  - Node (npx): `npx serve -l 5500`
  - VS Code: Live Server extension

Then visit: `Urbanadmark.netlify.app`

## Project structure
```
Urban Admark/
├─ index.html
├─ services.html
├─ ai.html
├─ case-studies.html
├─ about.html
├─ contact.html
└─ assets/
   ├─ css/
   │  └─ style.css
   ├─ js/
   │  └─ main.js
   ├─ logo.png
   ├─ hero-bg.jpg
   ├─ features-bg.jpg
   ├─ favicon.png
   └─ apple-touch-icon.png
```

## Editing
- Global styles: `assets/css/style.css`
- Scripts: `assets/js/main.js`
- Page content: respective `.html` files

## Deployment
Host on any static provider (GitHub Pages, Netlify, Vercel, S3, etc.). Upload the entire folder preserving paths.

## Contributing
- Create a feature branch
- Keep HTML/CSS consistent with existing style
- Test on desktop and mobile before PR

## License
Provided as-is. Add a specific license if required.
