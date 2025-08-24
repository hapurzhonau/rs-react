import { create } from 'zustand';

export interface FormData {
  id: number;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  terms: boolean | undefined;
  country: string;
  image: string;
  from: 'controlled' | 'uncontrolled';
  confirmPassword?: string;
}

interface FormStore {
  forms: FormData[];
  addData: (data: Omit<FormData, 'id'>) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  forms: [],
  addData: (data) =>
    set((state) => ({
      forms: [...state.forms, { ...data, id: Date.now() }],
    })),
}));
