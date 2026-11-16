import React, { Suspense } from "react";
import CocaColaVerification from "../../components/Verification/CocaColaVerification";

export const metadata = {
  title: "Certificate Verification",
  description:
    "Verify physical workshop certificate authenticity issued by Accredian.",
};

export default function CocaColaVerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-500 font-medium">
          Loading certificate verification...
        </div>
      }
    >
      <CocaColaVerification />
    </Suspense>
  );
}
