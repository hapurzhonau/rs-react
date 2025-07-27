import { useState } from 'react';

export const ButtonError = () => {
  const [isError, setIsError] = useState(false);
  if (isError) throw new Error('Error from ButtonError');
  const handleError = () => {
    setIsError((prev: boolean) => !prev);
  };

  return (
    <button
      onClick={handleError}
      className="border-2 rounded-sm px-3 bg-gray-700 cursor-pointer max-w-fit"
    >
      Error
    </button>
  );
};
