import { Repository } from '@/entities/repository';

export interface AllRepositoriesType {
  search: {
    edges: {
      node: Repository;
    }[];
    pageInfo: {
      endCursor: string;
      startCursor: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    repositoryCount: number;
  };
}

export interface UserRepositoriesType {
  viewer: {
    repositories: {
      edges: {
        node: Repository;
      }[];
      pageInfo: {
        endCursor: string;
        startCursor: string;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      totalCount: number;
    };
  };
}
