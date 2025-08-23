import { create } from 'zustand';

export interface UncontrolledFormData {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  terms: boolean;
  image: string;
  password: string;
  from: string;
}

export type UncontrolledFormDataInput = Omit<UncontrolledFormData, 'id'>;

interface FormDataState {
  forms: UncontrolledFormData[];
  addData: (data: UncontrolledFormDataInput) => void;
}

export const useUncontrolledFormStore = create<FormDataState>((set) => ({
  forms: [],
  addData: (data) =>
    set((state) => ({
      forms: [...state.forms, { ...data, id: Date.now() }],
    })),
}));
