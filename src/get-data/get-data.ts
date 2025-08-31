const path = import.meta.env.VITE_DATA_PATH;
export const getData = async () => {
  const response = await fetch(path);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};
