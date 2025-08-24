import { create } from 'zustand';

export interface ControlledFormSaved {
  id: number;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  terms: boolean | undefined;
  country: string;
  image: string;
}

interface ControlledFormState {
  forms: ControlledFormSaved[];
  addData: (data: Omit<ControlledFormSaved, 'id'>) => void;
}

export const useControlledFormStore = create<ControlledFormState>((set) => ({
  forms: [],
  addData: (data) =>
    set((state) => ({
      forms: [...state.forms, { ...data, id: Date.now() }],
    })),
}));
