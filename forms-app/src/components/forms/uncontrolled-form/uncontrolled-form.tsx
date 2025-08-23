import { type FormEvent, useRef } from 'react';

import { useFormStore } from '../../../store/use-form-store';
import { Button } from '../../button/button';
import { useModalStore } from '../../../store/use-modal-store';

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (password: string) => {
  return (
    /[0-9]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
};

export const UncontrolledForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { close } = useModalStore();
  const { addData } = useFormStore();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);

    const name = data.get('name') as string;
    const age = Number(data.get('age'));
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const confirmPassword = data.get('confirmPassword') as string;
    const gender = data.get('gender') as string;
    const terms = data.get('terms') === 'on';
    const file = data.get('file') as File | null;

    // validation
    const errors: string[] = [];

    if (!/^[A-Z]/.test(name)) {
      errors.push('Name must start with uppercase letter');
    }
    if (isNaN(age) || age < 0) {
      errors.push('Age must be a positive number');
    }
    if (!isValidEmail(email)) {
      errors.push('Invalid email');
    }
    if (password !== confirmPassword) {
      errors.push('Passwords must match');
    }
    if (!isStrongPassword(password)) {
      errors.push('Password is too weak');
    }
    if (!terms) {
      errors.push('You must accept Terms and Conditions');
    }
    if (file) {
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        errors.push('Only PNG/JPEG allowed');
      }
      if (file.size > 2 * 1024 * 1024) {
        errors.push('File too large (max 2MB)');
      }
    }

    // pic base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const newData = {
        name,
        age,
        email,
        password,
        gender,
        terms,
        image: reader.result as string,
        from: 'uncontrolled',
      };
      addData(newData);
      close();
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      addData({
        name,
        age,
        email,
        password,
        gender,
        terms,
        image: '',
        from: 'uncontrolled',
      });
      close();
    }
  };

  return (
    <form noValidate ref={formRef} onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" type="text" className="border" />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input id="age" name="age" type="number" className="border" />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" className="border" />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          className="border"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className="border"
        />
      </div>

      <div>
        <label>Gender:</label>
        <select name="gender" className="border">
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <label className="cursor-pointer">
          <input type="checkbox" name="terms" className="cursor-pointer" />
          Accept Terms and Conditions
        </label>
      </div>

      <div className="border">
        <label htmlFor="file" className=" cursor-pointer">
          Upload picture:
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/png, image/jpeg"
        />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};
