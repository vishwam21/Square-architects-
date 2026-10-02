# SQUARE ARCHITECTS

Premium consultation website for **SQUARE ARCHITECTS**, led by Ashwin Patel.

## Files

- `index.html` — GitHub Pages-ready page in the repository root
- `style.css` — responsive architecture-inspired design system
- `script.js` — mobile navigation, scroll reveals, back-to-top and consultation mailto behavior
- `logo.svg` — reusable brand mark and favicon
- `google-apps-script.gs` — optional automatic email backend reference

## GitHub Pages setup

1. Upload `index.html`, `style.css`, `script.js`, `logo.svg`, `google-apps-script.gs`, and `README.md` to the same GitHub repository. Keep `index.html` at the repository root.
2. Open **Settings → Pages** in GitHub.
3. Under **Build and deployment**, choose **Deploy from a branch**, select your main branch and the `/ (root)` folder, then save.
4. GitHub Pages will serve the site as a static website. No server, password, Gmail credential, or private secret is required.

## Consultation email behavior

The default secure frontend-only flow uses `mailto:`. When a visitor submits the four required fields — Name, Number, Email and Description — their default email application or Gmail opens with:

- Recipient: `patelharsha680@gmail.com`
- Subject: `New Consultation Request - SQUARE ARCHITECTS`
- Body containing all four submitted values

The visitor must press **Send** in their email application to complete delivery. The form does not collect or expose any password or private credential.

## Optional automatic Google Apps Script backend

`google-apps-script.gs` is provided for a no-manual-send option:

1. Go to [script.google.com](https://script.google.com) and create a new project.
2. Paste the contents of `google-apps-script.gs` into the editor and save.
3. Select **Deploy → New deployment**, choose **Web app**, execute as **Me**, and allow access for **Anyone**.
4. Authorize the script to send email, then copy the deployed `/exec` URL.
5. Replace the `mailto` block in `script.js` with a `fetch()` POST to that URL. Send JSON with exactly `name`, `number`, `email`, and `description`.
6. Do not paste a Gmail password, API key, service-account key, or other secret into GitHub or frontend files.

## Local preview

The project can also be previewed with the included Vite setup. The static files above remain the source to upload to GitHub Pages.