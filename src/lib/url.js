import jsoun from "jsoun";

export const getBaseUrl = () => {
  const getUrl = window.location;

  return (
    getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split("/")[1]
  );
};

export const getStateFromUrl = () => {
  const data = window.location.hash.substr(1);
  if (data === "") return {};
  try {
    return jsoun.decode(data);
  } catch (e) {
    console.error("Unable to parse state from URL", e);
    return {};
  }
};
