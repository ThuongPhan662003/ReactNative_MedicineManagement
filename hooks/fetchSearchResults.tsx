export const fetchSearchResults = async (keyword: string) => {
  const response = await fetch(`https://api.example.com/search?q=${keyword}`);
  const results = await response.json();
  return results;
};
