import { makeHtmlAttributes } from "@rollup/plugin-html";

export const template = async ({ attributes, files, publicPath }) => {
  const title = "color × color";
  const siteUrl = "https://colorcolor.in";
  const description =
    "Color-color is a tool to create accessible color systems for UIs. It uses HSLuv color space to create perceptually uniform colors.";
  const imagePath = `${siteUrl}/screenshot.jpg`;

  const scripts = (files.js || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.script);
      return `<script src="${publicPath}${fileName}"${attrs}></script>`;
    })
    .join("\n");

  const links = (files.css || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.link);
      return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
    })
    .join("\n");

  return `<!doctype html>
<html${makeHtmlAttributes(attributes.html)}>
  <head>
    <meta charset="utf-8">
    <meta name=viewport content="width=device-width,initial-scale=1">
    <title>${title}</title>
    <meta name="description" content="${description}">

    <!-- Facebook Meta Tags -->
    <meta property="og:url" content="${siteUrl}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${imagePath}">

    <!-- Twitter Meta Tags -->
    <meta property="twitter:url" content="${siteUrl}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${imagePath}">

    ${links}
    ${scripts}
  </head>
  <body></body>
</html>`;
};
