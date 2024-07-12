export interface Repository {
  id: string;
  name: string;
  stargazerCount: number;
  pushedAt: string;
  url: string;
}

export interface RepositoryCardProps {
  card: Repository;
}
