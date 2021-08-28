import { createSlice } from "@reduxjs/toolkit";
import { call, takeEvery, put } from "redux-saga/effects";
import Axios from "axios";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    data: undefined,
    error: undefined,
  },
  reducers: {
    isLoginLoading: () => {
      return {
        loading: true,
      };
    },
    isLoginSucessfull: (state, action) => {
      return {
        loading: false,
        data: action.payload,
      };
    },
    isLoginError: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

// reducers
export const { isLoginLoading, isLoginSucessfull, isLoginError } =
  loginSlice.actions;

// api call
const callAPI = async ({ url, method, data }) => {
  return await Axios({
    url,
    method,
    data,
  });
};

// saga
export function* loginSaga() {
  try {
    const result = yield call(() =>
      callAPI({ url: "https://5ce2c23be3ced20014d35e3d.mockapi.io/api/todos" })
    );
    yield put(isLoginLoading(true));
    yield put(isLoginSucessfull(result.data));
    yield put(isLoginLoading(false));
  } catch (e) {
    yield put(isLoginError(e));
  }
}

// watchers
export function* watchLoginSaga() {
  yield takeEvery("LOGIN_REQUESTED", loginSaga);
}
