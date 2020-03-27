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
  return jsoun.decode(data);
};
