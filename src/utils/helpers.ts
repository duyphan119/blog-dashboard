import slugify from "slugify";

export const toSlug = (text: string) => {
  return slugify(text, {
    locale: "vi",
    lower: true,
    remove: /.,;':"[]{}!`~=+-=/g,
    replacement: "-",
  });
};

export const getRate = (a: number, b: number) => {
  let min = a > b ? b : a;
  let max = a > b ? a : b;
  if (min === 0) return max;

  return max / min - 1;
};
