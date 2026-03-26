import SuccessStories from "../components/success-stories/success-stories";

import React, { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SuccessStories />
    </Suspense>
  );
}
