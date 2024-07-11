import { createStore, createEvent } from 'effector';

export const setPaginationCount = createEvent<number>();

export const $paginationCount = createStore<number>(0).on(setPaginationCount, (_, paginationCount) => paginationCount);
