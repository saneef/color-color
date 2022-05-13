const siteUrl = "https://colorcolor.in";

const info = {
  title: "color × color",
  description:
    "Color-color is a tool to create accessible color systems for UIs. You can use Okhsl or HSLuv color spaces to create perceptually uniform colors.",
  siteUrl,
  imagePath: `${siteUrl}/screenshot.jpg`,
  domain: process.env.PLAUSIBLE_DOMAINS || "",
};

export default info;
