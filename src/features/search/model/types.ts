import { Repository } from '@/entities/repository';

export interface Repositories {
  search: {
    edges: {
      node: Repository;
    }[];
  };
}
