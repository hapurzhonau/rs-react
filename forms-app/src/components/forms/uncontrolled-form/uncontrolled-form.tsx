import { type FormEvent, useRef, useState } from 'react';
import { useUncontrolledFormStore } from '../../../store/use-uncontrolled-form-store';
import { useModalStore } from '../../../store/use-modal-store';
import { useCountryStore } from '../../../store/use-country-store';
import { Button } from '../../button/button';

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

interface FormErrors {
  name?: string;
  age?: string;
  email?: string;
  password?: string[];
  confirmPassword?: string;
  gender?: string;
  terms?: string;
  file?: string;
  country?: string;
}

export const UncontrolledForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { close } = useModalStore();
  const { addData } = useUncontrolledFormStore();
  const { countries } = useCountryStore();
  const [errors, setErrors] = useState<FormErrors>({});
  const [filteredCountries, setFilteredCountries] =
    useState<string[]>(countries);
  const [isFocused, setIsFocused] = useState(false);

  const validatePassword = (password: string): string[] => {
    const errs: string[] = [];
    if (!/[0-9]/.test(password)) errs.push('At least 1 number,');
    if (!/[A-Z]/.test(password)) errs.push('at least 1 uppercase letter,');
    if (!/[a-z]/.test(password)) errs.push('at least 1 lowercase letter,');
    if (!/[^A-Za-z0-9]/.test(password))
      errs.push('at least 1 special character');
    return errs;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);

    const name = data.get('name') as string;
    const ageRaw = data.get('age') as string;
    const age = Number(ageRaw);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const confirmPassword = data.get('confirmPassword') as string;
    const gender = data.get('gender') as string;
    const terms = data.get('terms') === 'on';
    const file = data.get('file') as File | null;
    const country = data.get('country') as string;

    const newErrors: FormErrors = {};

    if (!name || !/^[A-Z]/.test(name)) {
      newErrors.name = 'Name must start with uppercase letter';
    }
    if (!ageRaw) {
      newErrors.age = 'Age is required';
    } else if (isNaN(age) || age < 12) {
      newErrors.age = 'Age must be higher than 11';
    }
    if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors;
    }
    if (!gender) {
      newErrors.gender = 'Please select gender';
    }
    if (!terms) {
      newErrors.terms = 'You must accept Terms and Conditions';
    }
    if (!country) {
      newErrors.country = 'Please select country';
    } else if (!countries.includes(country)) {
      newErrors.country = 'Please choose a valid country';
    }
    if (file) {
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        newErrors.file = 'Only PNG/JPEG allowed';
      }
      if (file.size > 5 * 1024 * 1024) {
        newErrors.file = 'File too large (max 5MB)';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const submitData = {
      name,
      age,
      email,
      password,
      gender,
      terms,
      country,
      image: '',
      from: 'uncontrolled',
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        addData({ ...submitData, image: reader.result as string });
        close();
      };
      reader.readAsDataURL(file);
    } else {
      addData(submitData);
      close();
    }
  };

  const handleCountryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setFilteredCountries(
      countries.filter((c) => c.toLowerCase().includes(value))
    );
  };

  return (
    <form
      noValidate
      ref={formRef}
      onSubmit={onSubmit}
      className="space-y-6 relative"
    >
      <div className="relative">
        {errors.name && (
          <p className="text-red-500 text-xs absolute bottom-6">
            {errors.name}
          </p>
        )}
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          className="border"
          autoComplete="new"
        />
      </div>

      <div className="relative">
        {errors.age && (
          <p className="text-red-500 text-xs absolute bottom-6">{errors.age}</p>
        )}
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          name="age"
          type="number"
          className="border"
          autoComplete="off"
        />
      </div>

      <div className="relative">
        {errors.email && (
          <p className="text-red-500 text-xs absolute bottom-6">
            {errors.email}
          </p>
        )}
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          className="border"
          autoComplete="new"
        />
      </div>

      <div className="relative pt-3">
        {errors.password && (
          <div className="text-red-500 text-xs flex flex-wrap w-full max-w-80 absolute bottom-6">
            {errors.password.map((err, i) => (
              <p key={i}>{err}</p>
            ))}
          </div>
        )}
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          className="border"
        />
      </div>

      <div className="relative">
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs absolute bottom-6">
            {errors.confirmPassword}
          </p>
        )}
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className="border"
        />
      </div>

      <div className="relative">
        {errors.gender && (
          <p className="text-red-500 text-xs absolute bottom-6">
            {errors.gender}
          </p>
        )}
        <label>Gender:</label>
        <select name="gender" className="border">
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="relative">
        {errors.country && (
          <p className="text-red-500 text-xs absolute bottom-6">
            {errors.country}
          </p>
        )}
        <label htmlFor="country">Country:</label>
        <input
          id="country"
          name="country"
          type="text"
          className="border"
          onInput={handleCountryInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          autoComplete="new"
        />
        {isFocused && filteredCountries.length > 0 && (
          <ul className="border max-h-20 overflow-y-auto absolute bg-white w-full z-10">
            {filteredCountries.map((c) => (
              <li
                key={c}
                className="cursor-pointer px-2 hover:bg-gray-100"
                onMouseDown={(e) => {
                  e.preventDefault();
                  const input = formRef.current?.elements.namedItem(
                    'country'
                  ) as HTMLInputElement;
                  if (input) input.value = c;
                  setFilteredCountries([]);
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
            {errors.terms}
          </p>
        )}
        <label>
          <input type="checkbox" name="terms" className="cursor-pointer" />
          Accept Terms and Conditions
        </label>
      </div>

      <div className="relative">
        {errors.file && (
          <p className="text-red-500 text-xs absolute bottom-6">
            {errors.file}
          </p>
        )}
        <label htmlFor="file">Upload picture:</label>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/png, image/jpeg"
          className="border cursor-pointer"
        />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};
