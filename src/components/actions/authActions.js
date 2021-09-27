import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetchData";
import { types } from "../../types/types";
import { eventLogout } from "./eventsActions";
import { setError } from "./uiActions";

export const StartLogin = (email, password) => {
  return async (dispatch) => {
    const res = await fetchWithoutToken("auth", { email, password }, "POST");
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      console.log(body);
      dispatch(setError("loginError", body.msg));
    }
  };
};

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const res = await fetchWithoutToken(
      "auth/new",
      { name, email, password },
      "POST"
    );
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      dispatch(setError("registerError", body.msg));
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const res = await fetchWithToken("auth/renew");
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
    dispatch(eventLogout());
  };
};

const logout = () => ({
  type: types.authLogout,
});
