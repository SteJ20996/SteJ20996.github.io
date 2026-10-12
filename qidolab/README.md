# Qidolab 1.0 — production source

Target domain: https://qidolab.com/

This folder contains the complete static site: 18 original puzzles, optional extra steps, extreme challenges and Chinese, English and Spanish interfaces. All runtime scripts, styles and logos use local relative paths. No installation or compilation is needed.

The approved warm-cream theme uses warm charcoal, sage and muted apricot on desktop (980px and wider). Narrow screens retain cream, midnight blue and lake blue. The separate `../qidolab-preview/` folder retains the appearance comparison tools; none are loaded by this production page.

## Cloudflare Pages deployment from GitHub

Create a new Pages project with Git integration. Use these settings:

| Setting | Value |
| --- | --- |
| Repository | `SteJ20996/SteJ20996.github.io` |
| Production branch | `main` |
| Framework preset | `None` |
| Root directory | `qidolab` |
| Build command | `exit 0` |
| Build output directory | `.` |

After the first deployment succeeds, open the project's **Custom domains**, add `qidolab.com`, and follow Cloudflare's DNS setup. The domain is registered with Cloudflare. Wait until the custom domain and HTTPS are active before announcing the domain. Do not change the portfolio repository's root `CNAME`, which belongs to stephenjia.com.

GitHub updates to this folder can then deploy through the linked Pages project. `_headers` gives ES modules a JavaScript content type and makes browsers revalidate updated files.

Official references:

- https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- https://developers.cloudflare.com/pages/configuration/build-configuration/
- https://developers.cloudflare.com/pages/configuration/custom-domains/

## Local preview

From the repository root, run `python3 -m http.server 8080 --directory qidolab` and open http://localhost:8080/. Use an HTTP server because browsers load the game's ES modules through HTTP.

## Progress and achievements

Progress is stored in this browser for this origin. Moving from the stephenjia.com preview to qidolab.com starts a separate browser save; it does not automatically transfer previous progress.

- A check marks an original puzzle as solved; a star marks its optional extra step.
- Solving an extreme challenge earns a crown. It can be attempted before the extra step.
- Viewing its answer keeps the crown hollow. Answer exposure alone does not solve the extreme.
- A title and its marks turn gold when all three challenges are solved.
- Solving all 18 original puzzles turns the Quidence bridge gold. Its cosmetic handoff does not mark other puzzles as solved.

Question data, solvers and storage-key formats are retained from the reviewed game. Browser visual QA and mainland-China access testing still require real devices/networks.
