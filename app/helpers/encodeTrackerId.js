// encodeTrackerId.ts
import { Base64 } from "js-base64";

export const encodeBase64 = (str) => {
  try {
    const stringStr = String(str)
    return Base64.encode(stringStr);
  } catch (e) {
    console.log("error", e);
    return null;
  }
};
