import { createStore, createEvent } from 'effector';

export const setPaginationCount = createEvent<number>();
export const setCurrentPage = createEvent<string>();

export const $paginationCount = createStore<number>(0).on(setPaginationCount, (_, paginationCount) => paginationCount);
export const $currentPage = createStore<string>('1').on(setCurrentPage, (_, currentPage) => currentPage);
