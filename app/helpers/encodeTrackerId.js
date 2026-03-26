// encodeTrackerId.ts
import { Base64 } from "js-base64";

export const encodeBase64 = (str) => {
  try {
    return Base64.encode(str);
  } catch (e) {
    console.log("error", e);
    return null;
  }
};
