import { Suspense } from "react";
import Programs from "../../components/Programs/Programs";
import SkeletonWL from "../../components/Skeleton/Withoutlogin";

export default function ProgramPage() {
  return (
    <Suspense fallback={<SkeletonWL />}>
      <Programs />
    </Suspense>
  );
}
