import { push } from "@lagunovsky/redux-react-router";
import { PayloadAction } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import { toast } from "react-toastify";
import { call, put, takeEvery } from "redux-saga/effects";
import { setToken } from "utils/jwt";
import { ListResponse } from "./../../models/common";
import { User } from "./../../models/user";
import {
  ForgotPaload,
  login,
  loginFailed,
  LoginPayload,
  loginSuccess,
  logout,
  logoutFail,
  logoutSuccess,
  resetPassword,
  resetPasswordFail,
  resetPasswordSuccess,
} from "./authSlice";

function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    const res: ListResponse<User> = yield call(userApi.login, action.payload);

    if (res.token) localStorage.setItem("token", res.token);
    localStorage.setItem("currentUser", JSON.stringify(res.user));

    setToken(res.token as string);

    yield put(loginSuccess(res));

    if (res?.user?.role == "user") {
      yield put(push("/"));
    } else {
      yield put(push("/admin"));
    }
  } catch (error: any) {
    yield put(loginFailed(error.message));
    toast.error(error.response.data.error);
  }
}

function* handleResetPassword(action: PayloadAction<ForgotPaload>) {
  const { values, token } = action.payload;

  if (token) {
    try {
      const res: User = yield call(userApi.resetPassword, token, values);

      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      if (res.user) {
        localStorage.setItem("currentUser", JSON.stringify(res.user));
        yield put(resetPasswordSuccess(res.user));
        toast.success("success");

        if (res.user.role == "user") {
          yield put(push("/checkout"));
        } else {
          yield put(push("/admin"));
        }
      }
    } catch (error: any) {
      yield put(resetPasswordFail(error.message));
    }
  }
}

function* handleLogout(action: PayloadAction<string>) {
  try {
    yield call(userApi.logout);
    yield put(logoutSuccess());

    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");

    if (action.payload === "user") {
      yield put(push("/login"));
    } else {
      yield put(push("/admin/login"));
    }
  } catch (error) {
    yield put(logoutFail());
  }
}

export default function* authSaga() {
  yield takeEvery(login.type, handleLogin);
  yield takeEvery(logout.type, handleLogout);
  yield takeEvery(resetPassword.type, handleResetPassword);
}
