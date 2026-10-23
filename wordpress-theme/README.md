# PID Uganda WordPress migration package

This is an initial WordPress theme scaffold, kept on the separate wordpress-migration branch. It does not alter the live React/Vite app or DNS.

## Included
- Responsive theme using PID’s navy, blue and green identity.
- Native WordPress pages, navigation, featured images and theme customizer fields.
- PID Programmes custom post type, editable using the normal WordPress editor.
- Repeatable JSON importer at Appearance → PID Content Import for the services array in src/config/siteContent.json.

## Install only on WordPress hosting/staging
1. Zip the contents of the pid-uganda directory so style.css and functions.php are at the ZIP root.
2. In WordPress, go to Appearance → Themes → Add New Theme → Upload Theme, then activate on staging only.
3. Set the logo under Appearance → Customize → Site Identity. Set the homepage copy and image URLs under Appearance → Customize → PID Homepage.
4. Create pages such as About, Programmes, Impact, Opportunities and Contact. Create primary and footer menus under Appearance → Menus.
5. Upload src/config/siteContent.json from the original GitHub repository under Appearance → PID Content Import. Review all imported records.
6. Upload original image files from the repository into Media Library and set image URLs/featured images. Binary image files are not automatically copied by importing JSON.
7. Configure a maintained contact-form plugin and test delivery to info@piduganda.org. The theme does not fake form processing.
8. Test mobile navigation, every link, form delivery, HTTPS, redirects, metadata, sitemap, image loading and backups before launch.

## Safety
Do not change piduganda.org DNS until all checks pass and the owner approves cutover. Do not copy the old Cloudflare admin password into WordPress. This is an initial scaffold, not a completed or tested production migration; it needs real WordPress hosting and staging validation.