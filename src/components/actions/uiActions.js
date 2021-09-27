import { types } from "../../types/types";

export const setError = (nameError, error) => ({
  type: types.uisetError,
  payload: {
    nameError,
    error,
  },
});

export const removeError = (nameError) => ({
  type: types.uiRemoveError,
  payload: {
    nameError,
  },
});

export const startOpenModal = () => ({
  type: types.uiOpenModal,
});

export const StartCloseModal = () => ({
  type: types.uiCloseModal,
});
