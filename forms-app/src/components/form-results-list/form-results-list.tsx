import { useFormStore } from '../../store/use-form-store';

export const FormResultsList = () => {
  const forms = useFormStore((state) => state.forms);

  if (forms.length === 0) return <p>No submitted data</p>;

  return (
    <div className="gap-2 flex flex-wrap justify-center">
      {forms.map((el) => (
        <div
          key={el.id}
          className="border-gray-700 border-2 p-2 rounded-md relative pb-16"
        >
          <p className="text-white">{el.from}</p>
          <p>Name: {el.name}</p>
          <p>Age: {el.age}</p>
          <p>Email: {el.email}</p>
          <p>Password: {el.password}</p>
          <p>Gender: {el.gender}</p>
          <p>Country: {el.country}</p>
          <p>Terms accepted: {el.terms ? 'Yes' : 'No'}</p>
          <div>
            Image <br />
            {el.image && (
              <img
                src={el.image}
                alt="Uploaded image"
                className="max-w-[80px] aspect-square w-full absolute right-1/40 bottom-1 rounded-sm object-cover"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
