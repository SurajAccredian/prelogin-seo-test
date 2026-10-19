import { lazyComponent } from "../../handlers/load.handler";

export const Admission = lazyComponent(() => import("./Admission"));
export const Terms = lazyComponent(() => import("./Terms"));
export const Privacy = lazyComponent(() => import("./Privacy"));
export const Referral = lazyComponent(() => import("./Referral"));
export const Refund = lazyComponent(() => import("./Refund"));
export const Cancellation = lazyComponent(() => import("./Cancellation"));
export const CookiePolicy = lazyComponent(() => import("./CookiePolicy"));
export const AccountDeletion = lazyComponent(() => import("./AccountDeletion"));
