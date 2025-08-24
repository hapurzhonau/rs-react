import './App.css';
import { useModalStore } from './store/use-modal-store';
import { Modal } from './components/modal/modal';
import { Button } from './components/button/button';
import { FormResultsList } from './components/form-results-list/form-results-list';

function App() {
  const { open } = useModalStore();
  return (
    <div className="py-6 px-1 gap-4 flex flex-col mx-auto max-w-fit">
      <div className="flex flex-wrap gap-4 justify-center max-w-full">
        <Button onClick={() => open('uncontrolled', 'uncontrolled')}>
          Uncontrolled Form
        </Button>
        <Button onClick={() => open('controlled', 'controlled')}>
          Controlled Form
        </Button>
      </div>
      <FormResultsList />
      <Modal />
    </div>
  );
}

export default App;
