export const setMaxRepositories = (maxValue: number, repositoriesCount: number) => {
  return repositoriesCount > maxValue ? maxValue : repositoriesCount;
};
