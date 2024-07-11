import { createStore, createEvent } from 'effector';

import { Repository } from './types';

export const setRepositories = createEvent<Repository[]>();

export const $repositories = createStore<Repository[]>([]).on(setRepositories, (_, repositories) => repositories);
