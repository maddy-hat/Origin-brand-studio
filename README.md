# Origin — Full-stack starter website

A responsive brand studio website for product photography, brand strategy, and digital marketing advisory. Built with plain HTML/CSS/JS on the frontend and Node.js + Express on the backend.

## Requirements
- Node.js 18+ (recommended)
- npm

## Run locally
1. Extract this folder.
2. Open a terminal inside `brand-studio-website`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create your local environment file:
   - Windows PowerShell: `Copy-Item .env.example .env`
   - macOS/Linux: `cp .env.example .env`
5. Start the server:
   ```bash
   npm start
   ```
6. Open `http://localhost:3000`.

The enquiry form posts to `POST /api/enquiries`. For now, valid enquiries are printed to the server terminal. The backend also includes basic input validation, a honeypot field, rate limiting, and security headers.

## Important before launch
- Update the Origin identity if needed.
- Replace `https://www.example.com/` in `index.html`, `robots.txt`, and `sitemap.xml` with the real domain.
- Replace concept visuals with approved photos / actual project work.
- Add real contact details, social links, privacy policy, and terms as appropriate.
- Connect the enquiry route to an email provider or database. Do not put SMTP/API secrets in frontend code.
- Deploy to a Node-compatible host and configure HTTPS.
- Test the form, mobile layout, keyboard navigation, and performance on the deployed site.

## API
- `GET /api/health` — basic health check
- `POST /api/enquiries` — accepts JSON fields `name`, `email`, `business`, `service`, `message`, and optional hidden honeypot field `website`

## SEO foundation included
- Page title and meta description
- Semantic headings and landmarks
- Canonical URL placeholder
- `robots.txt` and `sitemap.xml` placeholders
- Responsive layout and accessible form status

Later SEO work should include keyword and competitor research, page-specific metadata, image alt text based on the actual image, Core Web Vitals checks, Google Search Console, GA4 with consent/privacy review where applicable, local SEO / Google Business Profile setup, and a content plan. Do not add fake reviews or pretend the concept visuals are real client projects.
