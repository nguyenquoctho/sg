export const getIdFromSlug = (slug) => {
  let words = slug.split("-");
  return words[0];
};
