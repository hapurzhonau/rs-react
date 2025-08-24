import { describe, test, expect, beforeEach } from 'vitest';
import { useFormStore, type FormData } from './use-form-store';

beforeEach(() => {
  useFormStore.setState({ forms: [] });
});

describe('useFormStore', () => {
  test('initial is empty', () => {
    const { forms } = useFormStore.getState();
    expect(forms).toEqual([]);
  });

  test('add new form', () => {
    const data: Omit<FormData, 'id'> = {
      password: '',
      gender: '',
      terms: undefined,
      country: '',
      image: '',
      from: 'controlled',
      name: '',
      age: 0,
      email: '',
    };

    useFormStore.getState().addData(data);

    const { forms } = useFormStore.getState();
    expect(forms).toHaveLength(1);
    expect(forms[0]).toMatchObject(data);
    expect(typeof forms[0].id).toBe('number');
  });
});
