import { makeHtmlAttributes } from "@rollup/plugin-html";

export const template = async ({ attributes, files, publicPath, title }) => {
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
    <title>${title}</title>
    <meta name="description" content="Color-color is a tool to create accessible color systems for UIs. It uses HSLuv color space to create perceptually uniform colors.">
    ${links}
    ${scripts}
  </head>
  <body></body>
</html>`;
};
