import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useModalStore } from '../../store/use-modal-store';
import { Button } from '../button/button';

interface ModalProps {
  children: ReactNode;
  title?: string;
}

export const Modal = ({ children, title }: ModalProps) => {
  const { isOpen, close } = useModalStore();

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLDivElement;
    panelRef.current?.focus();

    return () => {
      previouslyFocused.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        close();
        return;
      }

      if (e.key === 'Tab') {
        const panelContainer = panelRef.current;
        if (!panelContainer) return;

        const focusable = panelContainer.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [close, isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) close();
      }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="bg-white rounded-xl px-6 py-12 shadow-xl relative"
      >
        <Button
          className="absolute top-2 right-2 text-white hover:text-black"
          onClick={close}
        >
          ✕
        </Button>
        {title && (
          <h2 id={titleId} className="text-gray-500">
            {title}
          </h2>
        )}
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};
