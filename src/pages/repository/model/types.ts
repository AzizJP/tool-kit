export interface RepositoryPageType {
  node: {
    name: string;
    stargazerCount: number;
    defaultBranchRef: {
      target: {
        committedDate: string;
      };
    };
    owner: {
      avatarUrl: string;
      login: string;
      url: string;
    };
    languages: {
      edges: {
        node: {
          name: string;
        };
      }[];
    };
    description: string;
  };
}

export type UserProps = RepositoryPageType['node']['owner'];

export interface RepositoryInfoProps {
  name: string;
  stars: number;
  committedDate: string;
  languages: RepositoryPageType['node']['languages'];
  description: string;
}
