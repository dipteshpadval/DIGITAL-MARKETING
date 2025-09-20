# Urban Admark

A static website for Urban Admark featuring landing, services, AI, case studies, about, and contact pages.

## Quick start
- Open `index.html` directly in your browser, or
- Serve the folder via a local web server to avoid CORS issues:
  - PowerShell (Python): `python -m http.server 5500`
  - Node (npx): `npx serve -l 5500`
  - VS Code: Live Server extension

Then visit: `Urbanadmark.netlify.app
`

### WhatsApp form notifications
This site includes a Netlify Function to send contact submissions to WhatsApp via WhatsApp Cloud API.

1) In Netlify project settings → Environment variables add:
   - `WHATSAPP_TOKEN`: Permanent token from Meta app
   - `WHATSAPP_PHONE_NUMBER_ID`: Phone number ID from WhatsApp Cloud
   - `WHATSAPP_TO_NUMBER`: Destination number in international format, e.g. `919970809596`
2) Deploy the site on Netlify. The function is at `/.netlify/functions/send-whatsapp`.
3) Use the Contact page form to test.

Local dev: use `netlify-cli` to run functions locally
```
npm i -g netlify-cli
netlify dev
```

### Netlify Forms (store submissions and optional email notifications)
The contact form is enabled for Netlify Forms. Submissions appear in your Netlify dashboard.

Steps:
- Ensure the form element has `name="contact"`, `data-netlify="true"`, and a hidden `form-name` field (already added).
- In Netlify → Forms → Notifications, add an email notification if you want emails for each submission.
- View submissions in Netlify → Forms → contact.

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
