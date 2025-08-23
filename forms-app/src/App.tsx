import './App.css';

import { useModalStore } from './store/use-modal-store';
import { Modal } from './components/modal/modal';
import { Button } from './components/button/button';

function App() {
  const { open } = useModalStore();
  return (
    <div className="p-6">
      <Button onClick={() => open('uncontrolled', 'uncontrolled')}>
        Uncontrolled
      </Button>
      <Button onClick={() => open('controlled', 'controlled')}>
        Controlled
      </Button>
      <Modal />
    </div>
  );
}

export default App;
