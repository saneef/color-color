export function base64ToBuffer(base64) {
  var binstr = atob(base64)
    .split(",")
    .map((x) => +x);
  var buf = new Uint8Array(binstr);
  return buf;
}
