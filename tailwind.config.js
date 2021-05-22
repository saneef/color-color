const isProduction = process.env.NODE_ENV === "production";
module.exports = {
  purge: {
    enabled: isProduction,
    content: ["./src/**/*.svelte"],
    safelist: [/svelte-/],
  },
};
