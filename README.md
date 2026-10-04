# Fame Agents website

A complete static website with English, Spanish, Portuguese, French, German and Italian pages. This revision focuses on website design and redesign, short video editing, and social media content and management. It displays no prices. The website is built and included in `public/`. No npm installation, framework, database or build service is needed to serve it.

## Preview

Run `python3 -m http.server 8080 --directory public` from this folder, then visit `http://localhost:8080`. Or open `public/index.html` directly for the English page. A web server is recommended for the full navigation and 404 page.

## What is included

- Six fully rendered languages with distinct URLs, page titles, descriptions, canonical URLs and hreflang links.
- Three core service groups with translated deliverables in every language.
- Service selection connected to a project brief; email preview, WhatsApp brief link and text-file download.
- Direct WhatsApp buttons for the confirmed business number +39 149 707 3725.
- Original abstract brand artwork, vector service icons and a provisional typographic wordmark.
- Mobile navigation, reduced-motion support, labelled fields, keyboard focus styling and a skip link.
- Direct email, all three supplied phone numbers, and all six social channels.
- Sitemap, robots.txt, structured organization data, social preview image, favicon and custom 404 page.
- No analytics, tracking pixels, embedded social feeds, external fonts or paid dependencies.

## Edit and rebuild

Edit the current service descriptions and positioning in `focus.py`. Shared interface labels are in `build.py`. Run `python3 build.py`, then `python3 check.py`. Styling and interaction logic are in `public/assets/style.css` and `public/assets/app.js`. These assets are shared by all languages. The prebuilt output is included so rebuilding is optional.

English is `/`, Spanish `/es/`, Portuguese `/pt/`, French `/fr/`, German `/de/`, Italian `/it/`. Portuguese uses Brazilian Portuguese. Language links are always visible through the header selector; the server does not automatically redirect visitors by location.

## GitHub and free hosting

Use GitHub for source control and Cloudflare Pages for hosting. GitHub Pages states that it is not intended or allowed as free hosting to run an online business or sites primarily facilitating commercial transactions. This agency setup therefore uses a separate static host. Current Cloudflare Pages Free limits include 500 builds per month and custom-domain support. Check provider terms and limits when launching.

1. Create a GitHub repository, such as `fameagents-website`. Upload this folder’s contents, keeping `public/` as a folder.
2. In Cloudflare, create a Pages project using Git integration and connect that repository.
3. Choose framework preset **None**. Leave the build command empty. Set the output directory to **public**. No environment variables are needed.
4. Deploy a preview. Review all six pages, service selection, email preview/download, external links, mobile layout and contact numbers.
5. Add `fameagents.de` and optionally `www.fameagents.de` through the Pages custom-domain settings. Follow the provider’s DNS instructions. Preserve existing email DNS records, including MX, SPF, DKIM and DMARC. Domain purchase alone does not configure hosting.
6. Use one canonical domain. Redirect the alternate hostname to `https://fameagents.de` using the hosting provider’s redirect settings after both hostnames are configured.
7. Future commits to the connected production branch update the website automatically.

Source: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
Source: https://developers.cloudflare.com/pages/get-started/git-integration/
Source: https://developers.cloudflare.com/pages/platform/limits/

## Costs

This build has no paid themes, subscriptions or dependencies. GitHub source control and Cloudflare Pages can use their free tiers within current limits. Domain renewals and the existing email account remain separate costs. Optional third-party software and advertising are agreed separately. The public pages have no prices or numerical budget ranges. The form asks whether visitors have a budget in mind or need advice. No payment processing is implemented.

## Before public launch

- Replace `public/legal.html`, currently an explicitly marked English pre-launch draft, with the company’s complete legal notice and privacy policy, translated into all six languages. Supply legal entity, business address, representative and relevant registration/VAT information. Confirm the final policy reflects actual hosting and email handling. The draft is excluded from search indexing.
- Supply permission-cleared portfolio images and real project details: goal, work delivered and verified results. The current site directs visitors to supplied social channels; it does not invent clients, reviews or case studies.
- The owner confirmed WhatsApp on `+39 149 707 3725`. Its link is `https://wa.me/391497073725`. Check calls on all supplied phone numbers and verify the WhatsApp conversation opens on your phone before public launch.
- Approve the proposed typographic wordmark. Your supplied original is preserved as `public/assets/original-logo.png`. The build does not use a registered trademark symbol because registration was not independently confirmed.
- Review translations with native speakers before public release. All main website and interaction copy is translated; the legal draft and 404 page are English.
- Verify real Facebook history and obtain permission to quote any reviews. The claimed July 4, 2018 creation date could not be independently verified during this research.
- Check desktop and phone visuals in a real browser before publishing. Automated source/link checks and JavaScript syntax validation passed, but do not establish visual performance, working browser interactions, accessibility certification or search ranking.

## Contact brief behavior

The form does not automatically send anything. It previews a brief, then offers an email link, a WhatsApp link containing the brief, and a downloadable UTF-8 text file. Visitors choose the channel and send the message themselves. Selecting the WhatsApp brief link passes the prepared text to WhatsApp, a third-party service. The form does not save contact details to cookies or browser storage. Email and WhatsApp links can be limited by device configuration or long message length, which is why a download fallback is included. A server-backed form can be added later if desired.

## Verification for this revision

All six pages passed checks for three service cards, three service selections, local links, section anchors, language links, structured data, WhatsApp destination and absence of public currency symbols. JavaScript syntax passed. The browser preview could not reach the local server, returning `ERR_BLOCKED_BY_CLIENT`, so desktop/mobile visual checks and real-browser enquiry tests remain to be performed. No email or WhatsApp message was sent during verification.

## Artwork

The hero is original generated abstract brand artwork, not a photograph of client work. It was created with the built-in image-generation tool using this prompt: “Premium sculptural editorial 3D still life: polished chrome ribbon forming an abstract looping orbital knot around a glowing orange sphere, dark charcoal background, subtle warm orange stage spotlights, wide cinematic composition with subject center-right and negative space left; no text, logos, people or watermark.” Final website asset: `public/assets/hero.webp`. Icons and the globe are native vector illustrations. The wordmark is a provisional visual direction.

See `COMPETITOR-RESEARCH.md` for the competitor comparison and growth priorities.
