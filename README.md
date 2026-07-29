# NCDC Website — Design Concept (Multi-Page)

A multi-page static website for the National Capital District Commission concept,
with a shared header and footer loaded on every page.

**Important:** This is an unofficial design concept, not the real NCDC website.
It carries a visible banner and footer disclaimer saying so — keep both in place
unless you have authorisation from NCDC to represent this as an official or
endorsed site. The real official site is ncdc.gov.pg.

## Structure

```
index.html                 Home
building-approvals.html    Service page
business-licensing.html    Service page
civil-registry.html        Service page
waste-environment.html     Service page
markets-trading.html       Service page
community-grants.html      Service page
about.html                 About the Commission
news.html                  News & notices
contact.html                Contact page
header.html                 Shared header partial (nav + disclaimer bar)
footer.html                 Shared footer partial (links + disclaimer)
assets/style.css            Shared styles for every page
assets/main.js               Loads header.html/footer.html into every page,
                              plus mobile menu, active-link highlighting,
                              footer year, and scroll animations
```

Every page includes an empty `<div id="header-placeholder">` and
`<div id="footer-placeholder">`, and `assets/main.js` fetches `header.html`
and `footer.html` and injects them in. Change the nav links or footer once,
in those two files, and every page updates.

## Important: this needs to be served over HTTP

Because the header/footer are loaded with `fetch()`, opening `index.html`
directly by double-clicking it (a `file://` URL) will show a blank header —
browsers block `fetch()` on local files for security reasons. Two easy ways
to view it correctly:

**Locally**, run a simple server from the project folder:
```bash
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

**On GitHub Pages** this isn't an issue at all — GitHub serves the files over
real HTTP, so `fetch()` works normally.

## Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `ncdc-concept`).
2. Push the whole folder (keeping the file structure above):
   ```bash
   git init
   git add .
   git commit -m "Add NCDC multi-page concept site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/ncdc-concept.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, select **Deploy from a branch**.
5. Choose branch `main`, folder `/ (root)`, then **Save**.
6. Live in a minute or two at: `https://YOUR-USERNAME.github.io/ncdc-concept/`

## Before any real-world use

- Keep the "design concept" banner and footer disclaimer, or replace them with
  wording confirmed by NCDC's communications team if this becomes an authorised project.
- Contact details, fees, and process steps on each service page are illustrative —
  verify against actual current NCDC information before publishing anywhere.
- Contact form just shows an alert; wire it to Formspree/Getform or a real backend.
- To add another service page, copy one of the existing service pages as a
  starting template and update its content, `<title>`, and `data-nav` value —
  the header and footer will load automatically.
