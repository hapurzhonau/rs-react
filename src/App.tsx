import { lazy, Suspense } from 'react';
import Spinner from './components/spinner/spinner';

const List = lazy(() => import('./components/list/list'));

function App() {
  return (
    <div>
      <Suspense
        fallback={
          <div>
            <Spinner />
          </div>
        }
      >
        <List />
      </Suspense>
    </div>
  );
}

export default App;
