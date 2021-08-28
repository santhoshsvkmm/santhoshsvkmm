import { createSlice } from "@reduxjs/toolkit";
import formCleared from "store/reducers/settings/formCleared";

const initialState = {
  loading: false,
  data: undefined,
  error: undefined,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    isLanguageLoading: (state) => {
      const changeState = { loading: true };
      return {
        ...state,
        ...changeState,
      };
    },
    isLanguageSucessfull: (state, action) => {
      const changeState = { loading: false, data: action.payload };
      return {
        ...state,
        ...changeState,
      };
    },
    isLanguagerror: (state, action) => {
      const changeState = { loading: true, error: action.payload };
      return {
        ...state,
        ...changeState,
      };
    },
    languageIsClear(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: {
    [formCleared.type]: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const globalLanguage = (payload) => async (dispatch) => {
  const { isLanguageLoading, isLanguageSucessfull, isLanguageError } =
    languageSlice.actions;

  dispatch(isLanguageLoading());
  try {
    dispatch(isLanguageSucessfull(payload));
  } catch (e) {
    dispatch(isLanguageError(e.response));
  }
};

const { languageIsClear } = languageSlice.actions;

export { languageIsClear };

export default languageSlice.reducer;
