import pako from "pako";
import {
  encodeUrl as base64Encode,
  decode as base64Decode,
} from "@borderless/base64";

export const getBaseUrl = () => {
  const getUrl = window.location;

  return (
    getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split("/")[1]
  );
};

const getQueryParams = () => {
  const search = window.location.search;
  const queryParams = new URLSearchParams(search);
  let obj = {};

  for (const [key, value] of queryParams) {
    obj[key] = value;
  }

  return obj;
};

const buildUrl = (encodedState) => {
  const url = new URL(getBaseUrl());

  url.searchParams.append("s", encodedState);

  return url.href;
};

const serializeState = (state) =>
  base64Encode(pako.deflate(JSON.stringify(state)));

const deserializeState = (string) => {
  let data = "{}";

  try {
    const binaryData = base64Decode(string);

    data = pako.inflate(binaryData, { to: "string" });
  } catch (e) {
    console.log("Unable extract state from URL");
  }

  return JSON.parse(data);
};

export const getStateFromUrl = () => {
  const { s } = getQueryParams();

  if (s) {
    return deserializeState(s);
  }
  return {};
};

export const getStatefulUrl = (state) => {
  const encodedState = serializeState(state);

  return buildUrl(encodedState);
};
