import { types } from "../types/types";

const initialState = {
  modalOpen: false,
  msgError: {},
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };
    case types.uiCloseModal:
      return {
        ...state,
        modalOpen: false,
      };
    case types.uisetError:
      return {
        ...state,
        msgError: {
          ...state.msgError,
          [action.payload.nameError]: action.payload.error,
        },
      };
    case types.uiRemoveError:
      return {
        ...state,
        msgError: {
          ...state.msgError,
          [action.payload.nameError]: null,
        },
      };

    default:
      return state;
  }
};
