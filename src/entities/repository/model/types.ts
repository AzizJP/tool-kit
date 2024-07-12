export interface Repository {
  id: string;
  name: string;
  stargazerCount: number;
  defaultBranchRef: {
    target: {
      committedDate: string;
    };
  };
  url: string;
  isEmpty: boolean;
}

export interface RepositoryCardProps {
  card: Repository;
}
