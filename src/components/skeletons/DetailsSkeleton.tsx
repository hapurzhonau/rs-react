export const DetailsSkeleton = () => {
  return (
    <div aria-busy="true" className="animate-pulse flex flex-col gap-4">
      <p>Name: Loading...</p>
      <div className="w-full aspect-square object-cover bg-gray-500 mb-1" />
      <p>Status: Loading...</p>
      <p>Species: Loading... </p>
      <p>Gender: Loading...</p>
    </div>
  );
};
