import { create } from 'zustand';

type ModalType = 'uncontrolled' | 'controlled' | null;

interface ModalState {
  title: string;
  type: ModalType;
  isOpen: boolean;
  open: (type: Exclude<ModalType, null>, title: string) => void;
  close: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  title: '',
  type: null,
  isOpen: false,
  open: (type, title) => set({ isOpen: true, type, title }),
  close: () => set({ isOpen: false, type: null, title: '' }),
}));
