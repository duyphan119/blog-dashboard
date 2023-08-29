import { useSearchParams } from "react-router-dom";

export default function useQueryString() {
  const [queryString] = useSearchParams();

  const getString = (name: string, defaultValue: string) => {
    const result = queryString.get(name);

    if (!result) return defaultValue || "";

    return result;
  };

  const getNumber = (name: string, defaultValue: number) => {
    const result = queryString.get(name);

    if (!result) return defaultValue || 0;

    return +result;
  };

  const generateQueryString = (params: any) => {
    const qs = new URLSearchParams(params).toString();

    if (qs !== "") return "?" + qs;
    return qs;
  };

  return { getString, getNumber, generateQueryString };
}
