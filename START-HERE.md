# PLAYSTATE — complete website

All source files, original images, the custom logo and fonts are included.

## Run locally

1. Extract this ZIP.
2. Open a terminal inside the PLAYSTATE folder.
3. Run: python3 -m http.server 8080 --directory dist
   On Windows, you can also use: py -m http.server 8080 --directory dist
4. Open http://localhost:8080 in your browser.

Use a local web server: opening index.html directly as a file does not support the site's JavaScript modules and root-relative asset paths.

## Edit the website

Edit the files in src, then run: python3 tools/build.py
The dist folder contains the complete static website for hosting.
The included .openai/hosting.json identifies the existing PLAYSTATE Site. Do not reuse its project ID when creating a different Site.
For another hosting service, upload the contents of dist.
Update the canonical URL, social metadata and sitemap for your new address.

## Features

Exactly seven sections, eight sports, 16 product concepts, search and filters, product options, a saved kit drawer and downloadable kit lists.
Sample prices are planning guides; no orders or payments are processed.

See README.md for source structure and additional details.
