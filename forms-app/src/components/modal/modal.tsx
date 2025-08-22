import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useModalStore } from '../../store/use-modal-store';
import { Button } from '../button/button';

type ModalProps = {
  children: ReactNode;
};

export const Modal = ({ children }: ModalProps) => {
  const { isOpen, close } = useModalStore();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [close]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl px-6 py-12 shadow-xl relative">
        <Button
          className="absolute top-2 right-2 text-white hover:text-black"
          onClick={close}
        >
          ✕
        </Button>
        {children}
      </div>
    </div>,
    document.body
  );
};
