import * as yup from 'yup';

export const makeControlledFormSchema = (countries: string[]) =>
  yup.object({
    name: yup
      .string()
      .required('Name is required')
      .matches(/^[A-Z].*/, 'Name must start with uppercase letter'),

    age: yup
      .number()
      .transform((val, orig) =>
        orig === '' || orig === null ? undefined : val
      )
      .typeError('Age must be a number')
      .required('Age is required')
      .min(12, 'Age must be higher than 11')
      .max(150, 'Age must be less than 150'),

    email: yup.string().required('Email is required').email('Invalid email'),

    password: yup
      .string()
      .required('Password is required!')
      .test('has-number', 'At least 1 number,', (v) => !!v && /\d/.test(v))
      .test(
        'has-upper',
        'at least 1 uppercase letter,',
        (v) => !!v && /[A-Z]/.test(v)
      )
      .test(
        'has-lower',
        'at least 1 lowercase letter,',
        (v) => !!v && /[a-z]/.test(v)
      )
      .test(
        'has-special',
        'at least 1 special character',
        (v) => !!v && /[^A-Za-z0-9]/.test(v)
      ),

    confirmPassword: yup
      .string()
      .required('Please confirm password')
      .oneOf([yup.ref('password')], 'Passwords must match'),

    gender: yup.string().required('Please select gender'),

    terms: yup
      .boolean()
      .required()
      .oneOf([true], 'You must accept Terms and Conditions'),
    country: yup
      .string()
      .required('Please select country')
      .oneOf(countries, 'Please choose a valid country'),

    file: yup
      .mixed<FileList>()
      .required()
      .test('file-required', 'File is required', (list) => {
        return list && list.length > 0;
      })
      .test('file-type', 'Only PNG/JPEG allowed', (list) => {
        if (!list || list.length === 0) return false;
        const f = list[0];
        return ['image/png', 'image/jpeg'].includes(f.type);
      })
      .test('file-size', 'File too large (max 5MB)', (list) => {
        if (!list || list.length === 0) return false;
        const f = list[0];
        return f.size <= 5 * 1024 * 1024;
      }),
  });

export type ControlledFormValues = yup.InferType<
  ReturnType<typeof makeControlledFormSchema>
>;
