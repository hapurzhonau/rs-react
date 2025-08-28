const path = import.meta.env.VITE_DATA_PATH;
export const getData = async () => {
  const response = await fetch(path);
  const data = await response.json();
  return data;
};
