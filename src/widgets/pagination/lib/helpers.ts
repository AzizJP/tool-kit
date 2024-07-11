export const getPagination = (paginationCount: number) => {
  return Array.from({ length: paginationCount }, (_, i) => i + 1);
};

export const getPaginationLink = (number: number) => {
  if (number === 1) return '/';
  return `/?page=${number}`;
};
