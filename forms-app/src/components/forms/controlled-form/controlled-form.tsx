import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  makeControlledFormSchema,
  type ControlledFormValues,
} from '../../../validation/controlled-form.schema';
import { useCountryStore } from '../../../store/use-country-store';
import { useModalStore } from '../../../store/use-modal-store';
import { Button } from '../../button/button';
import { useControlledFormStore } from '../../../store/use-controlled-form-store';

export const ControlledForm = () => {
  const { countries } = useCountryStore();
  const schema = useMemo(
    () => makeControlledFormSchema(countries),
    [countries]
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<ControlledFormValues>({
    resolver: yupResolver(schema, { abortEarly: false }),
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      name: '',
      age: undefined as unknown as number,
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      terms: false,
      country: '',
      file: undefined,
    },
  });
  const countryReg = register('country');
  const countryValue = watch('country') || '';
  const [isCountryFocused, setIsCountryFocused] = useState(false);
  const [filteredCountries, setFilteredCountries] =
    useState<string[]>(countries);
  const countryInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const v = (countryValue ?? '').toLowerCase();
    setFilteredCountries(countries.filter((c) => c.toLowerCase().includes(v)));
  }, [countryValue, countries]);

  const { addData } = useControlledFormStore();
  const { close } = useModalStore();

  const onSubmit = async (values: ControlledFormValues) => {
    const toBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    let image = '';
    const f = values.file && values.file.length > 0 ? values.file[0] : null;
    if (f) {
      image = await toBase64(f);
    }

    addData({
      name: values.name,
      age: values.age,
      email: values.email,
      password: values.password,
      gender: values.gender,
      terms: values.terms,
      country: values.country,
      image,
      from: 'controlled',
    });

    reset();
    close();
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="relative">
        {errors.name && (
          <p className="text-red-500 text-xs absolute bottom-6">
            {errors.name.message}
          </p>
        )}
        <label htmlFor="c_name">Name:</label>
        <input
          id="c_name"
          type="text"
          className="border"
          autoComplete="new"
          {...register('name')}
        />
      </div>

      <div className="relative">
        {errors.age && (
          <p className="text-red-500 text-xs absolute bottom-6">
            {errors.age.message}
          </p>
        )}
        <label htmlFor="c_age">Age:</label>
        <input
          id="c_age"
          type="number"
          className="border"
          autoComplete="off"
          {...register('age', { valueAsNumber: true })}
        />
      </div>

      <div className="relative">
        {errors.email && (
          <p className="text-red-500 text-xs absolute bottom-6">
            {errors.email.message}
          </p>
        )}
        <label htmlFor="c_email">Email:</label>
        <input
          id="c_email"
          type="email"
          className="border"
          autoComplete="new"
          {...register('email')}
        />
      </div>

      <div className="relative pt-8">
        {errors.password && (
          <div className="text-red-500 text-xs space-y-1 flex flex-wrap max-w-80 absolute bottom-6">
            {errors.password.types
              ? Object.values(errors.password.types).map((m, i) => (
                  <p key={i}>{String(m)}</p>
                ))
              : errors.password.message && <p>{errors.password.message}</p>}
          </div>
        )}
        <label htmlFor="c_password">Password:</label>
        <input
          id="c_password"
          type="password"
          className="border"
          {...register('password')}
        />
      </div>

      <div className="relative">
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs absolute bottom-6">
            {errors.confirmPassword.message}
          </p>
        )}
        <label htmlFor="c_confirm">Confirm Password:</label>
        <input
          id="c_confirm"
          type="password"
          className="border"
          {...register('confirmPassword')}
        />
      </div>

      <div className="relative">
        {errors.gender && (
          <p className="text-red-500 text-xs absolute bottom-6">
            {errors.gender.message}
          </p>
        )}
        <label>Gender:</label>
        <select className="border" {...register('gender')}>
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="relative">
        {errors.country && (
          <p className="text-red-500 text-xs absolute bottom-6">
            {errors.country.message}
          </p>
        )}
        <label htmlFor="c_country">Country:</label>
        <input
          id="c_country"
          type="text"
          className="border"
          autoComplete="new"
          {...countryReg}
          ref={(el) => {
            countryReg.ref(el);
            countryInputRef.current = el;
          }}
          onFocus={() => {
            setIsCountryFocused(true);
          }}
          onBlur={() => setTimeout(() => setIsCountryFocused(false), 100)}
        />
        {isCountryFocused && filteredCountries.length > 0 && (
          <ul className="border max-h-20 overflow-y-auto absolute bg-white w-full z-10">
            {filteredCountries.map((c) => (
              <li
                key={c}
                className="cursor-pointer px-2 hover:bg-gray-100"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setValue('country', c, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative">
        {errors.terms && (
          <p className="text-red-500 text-xs absolute bottom-6">
            {errors.terms.message}
          </p>
        )}
        <label>
          <input
            type="checkbox"
            className="cursor-pointer"
            {...register('terms')}
          />
          Accept Terms and Conditions
        </label>
      </div>

      <div className="relative">
        {errors.file && (
          <p className="text-red-500 text-xs absolute bottom-6">
            {errors.file.message}
          </p>
        )}
        <label htmlFor="c_file">Upload picture:</label>
        <input
          id="c_file"
          type="file"
          accept="image/png, image/jpeg"
          className="border cursor-pointer"
          {...register('file')}
        />
      </div>

      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        className={
          !isValid || isSubmitting ? 'bg-pink-300 cursor-auto' : 'bg-pink-500'
        }
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};
