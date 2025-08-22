import './App.css';

import { useModalStore } from './store/use-modal-store';
import { Modal } from './components/modal/modal';
import { Button } from './components/button/button';

function App() {
  const { open } = useModalStore();
  return (
    <div className="p-6">
      <Button onClick={open}>Open Modal</Button>
      <Modal title="uncontrolled">
        <h2>MODAL</h2>
      </Modal>
    </div>
  );
}

export default App;
