import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useModalStore } from '../../store/use-modal-store';
import { Button } from '../button/button';
import { FormControlled } from '../forms/controlled-form.tsx/controlled-form';
import { UncontrolledForm } from '../forms/uncontrolled-form/uncontrolled-form';

export const Modal = () => {
  const { isOpen, close, type, title } = useModalStore();

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement as HTMLElement;
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
        const panel = panelRef.current;
        if (!panel) return;

        const focusable = panel.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (document.activeElement === first && e.shiftKey) {
          e.preventDefault();
          last.focus();
        } else if (document.activeElement === last && !e.shiftKey) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [close, isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center bg-black/60"
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) close();
      }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-labelledby={titleId}
        className="bg-white rounded-xl px-6 py-12 shadow-xl relative"
      >
        <Button
          className="absolute top-2 right-2 text-white hover:text-gray-600"
          onClick={close}
        >
          ✕
        </Button>

        {title && (
          <h2 id={titleId} className="text-xl mb-4 text-gray-600">
            {title}
          </h2>
        )}

        {type === 'uncontrolled' && <UncontrolledForm />}
        {type === 'controlled' && <FormControlled />}
      </div>
    </div>,
    document.body
  );
};
