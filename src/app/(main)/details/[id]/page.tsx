import { Suspense } from 'react';
import { MainPage } from '../../../../pages/MainPage';

export default function DetailsListWrapper() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <MainPage />
      </Suspense>
    </div>
  );
}
