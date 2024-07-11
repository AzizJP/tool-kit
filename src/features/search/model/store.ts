import { createStore, createEvent } from 'effector';

export const setIsEmptyInput = createEvent<boolean>();

export const $isEmptyInput = createStore<boolean>(true).on(setIsEmptyInput, (_, isEmptyInput) => isEmptyInput);
