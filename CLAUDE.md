# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog/website built with [Soupault](https://soupault.app/), a static site generator that uses TOML configuration, HTML templates, and Lua plugins. The site is deployed to Netlify.

## Build and Development Commands

### Building the site locally
```bash
soupault
```

The build process:
- Reads source files from `site/`
- Processes Markdown files with pandoc (CommonMark + smart typography)
- Applies HTML templates from `templates/`
- Runs Lua plugins from `plugins/`
- Outputs to `build/` directory

### Testing local changes
After running `soupault`, open `build/index.html` in a browser or serve the build directory with a local web server.

### Deployment
The site auto-deploys to Netlify on git push. Netlify runs `./netlify.sh` which downloads and runs soupault 4.10.0.

## Architecture

### Content Structure
- `site/` - Source content (Markdown and HTML files)
  - `site/blog/` - Blog posts in Markdown
  - `site/index.md` - Homepage
  - `site/about.md`, `site/resume.md` - Other pages
- `build/` - Generated output (git-ignored in production, committed here)
- `templates/` - HTML templates for page structure
  - `main.html` - Base template with `<main>` element
  - `header.html` - Site navigation
  - `footer.html` - Site footer

### Configuration
All site configuration is in `soupault.toml`:
- **Preprocessors**: Markdown files are converted with pandoc
- **Widgets**: Modular components that transform HTML (e.g., TOC generation, reading time, post headers)
- **Index views**: Auto-generate blog index and tag pages from post metadata
- **Custom options**: Site metadata, feed settings, blog summary count

### Blog Post Metadata
Blog posts use a custom `<post-metadata>` element (removed during build):
```html
<post-metadata>
  <post-title>Title Here</post-title>
  <post-date>YYYY-MM-DD</post-date>
  <post-tags>tag1, tag2, tag3</post-tags>
</post-metadata>
```

The `post-header` plugin (plugins/post-header.lua) extracts this metadata and generates a formatted header with title, date, and tags.

### Lua Plugins
Located in `plugins/`, auto-loaded by soupault:
- `post-header.lua` - Extracts post metadata and generates headers
- `reading-time.lua` - Calculates estimated reading time
- `section-link-highlight.lua` - Highlights active nav links
- `atom.lua` - Generates Atom feed
- `insert-if.lua` - Conditionally inserts HTML elements

Custom index processor in `helpers/blog-index.lua` generates blog index pages and per-tag pages.

### Widget Execution Order
Widgets run in dependency order defined by `after` directives in soupault.toml. Key sequence:
1. Headers/footers inserted
2. Post metadata extracted (`make-post-header`)
3. Reading time container inserted
4. Reading time calculated
5. Page title set (after post header exists)

### Draft Files
Files with `.draft` extension are ignored during build (see `ignore_extensions` in soupault.toml).

## Working with Blog Posts

### Creating a new post
1. Create a new `.md` file in `site/blog/`
2. Add post metadata block at the top
3. Write content in CommonMark markdown
4. Run `soupault` to build
5. Preview in `build/blog/[filename]/index.html`

### Tags
Tags are comma-separated in `<post-tags>`. The blog-index helper automatically:
- Generates individual tag pages at `/blog/tag/[tagname]/`
- Creates a tag index at `/blog/tag/`
- Links tags in post headers to tag pages

### Blog index
The blog index at `site/blog/index.md` auto-populates with entries via the `blog-index` view. The homepage shows the latest 10 posts (configurable via `blog_summary_max_entries` in `custom_options`).

## Key Files to Modify

- **Site metadata**: Edit `[custom_options]` section in `soupault.toml` (site_url, site_author, site_title)
- **Navigation menu**: Edit `templates/header.html`
- **Styling**: Edit `site/style.css` (or `site/simple.css` if using)
- **Page layout**: Edit `templates/main.html`
- **Widget behavior**: Edit `soupault.toml` widget configurations or Lua files in `plugins/`
