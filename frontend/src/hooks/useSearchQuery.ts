import { useSearchParams } from 'react-router-dom';

export function useSearchQuery(fieldName: string, defaultValue: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryValue = searchParams.get(fieldName) || defaultValue;

  function handleSearchQuery(value: string) {
    searchParams.set(fieldName, value);
    setSearchParams(searchParams);
  }
  return { queryValue, handleSearchQuery };
}
