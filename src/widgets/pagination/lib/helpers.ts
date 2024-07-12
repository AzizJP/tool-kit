export const getPagination = (paginationCount: number) => {
  return Array.from({ length: paginationCount }, (_, i) => i + 1);
};
