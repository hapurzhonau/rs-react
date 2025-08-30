import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface IModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose }: IModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-gray-600 p-4 rounded-lg min-w-[30vw] shadow-xl relative cursor-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-gray-300 hover:text-gray-900 cursor-pointer"
        >
          ✕
        </button>
        {children}
      </div>
      <button>Save</button>
    </div>,
    document.body
  );
};
