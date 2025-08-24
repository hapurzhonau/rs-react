import { useControlledFormStore } from '../../store/use-controlled-form-store';
import { useUncontrolledFormStore } from '../../store/use-uncontrolled-form-store';

export const FormResultsList = () => {
  const uncontrolledData = useUncontrolledFormStore((state) => state.forms);
  const controlledData = useControlledFormStore((state) => state.forms);
  if (!uncontrolledData) {
    return <p>Already no submitted data</p>;
  }
  return (
    <div className="gap-2 flex flex-wrap">
      <div>
        {uncontrolledData.map((el, ind) => (
          <div
            key={ind}
            className="border-gray-700 border-2 p-2 rounded-md relative pb-16"
          >
            <p>Name: {el.name}</p>
            <p>Age: {el.age}</p>
            <p>Email: {el.email}</p>
            <p>Password: {el.password}</p>
            <p>Gender: {el.gender}</p>
            <p>Country: {el.country}</p>
            <p>Terms accepted: {el.terms ? 'Yes' : 'No'}</p>
            <div>
              Image <br />
              <img
                src={el.image}
                alt="Uploaded image"
                className="max-w-[80px] aspect-square w-full absolute right-1/40 bottom-1 rounded-sm object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        {controlledData.map((el, ind) => (
          <div
            key={ind}
            className="border-gray-700 border-2 p-2 rounded-md relative pb-16"
          >
            <p>Name: {el.name}</p>
            <p>Age: {el.age}</p>
            <p>Email: {el.email}</p>
            <p>Password: {el.password}</p>
            <p>Gender: {el.gender}</p>
            <p>Country: {el.country}</p>
            <p>Terms accepted: {el.terms ? 'Yes' : 'No'}</p>
            <div>
              Image <br />
              <img
                src={el.image}
                alt="Uploaded image"
                className="max-w-[80px] aspect-square w-full absolute right-1/40 bottom-1 rounded-sm object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
