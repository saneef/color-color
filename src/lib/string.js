export const minify = (str) =>
  str.replace(/(\r\n|\n|\r)/gm, "").replace(/[ ]{2,}/gm, "");
