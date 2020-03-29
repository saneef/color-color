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
    ${links}
    ${scripts}
  </head>
  <body></body>
</html>`;
};
