import * as SecureStore from "expo-secure-store";
import createDataContext from "./createDataContext";
import AuthApi from "../api/auth";
import { navigate } from "../RootNavigation";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "login":
      return { errorMessage: null, token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: null };
    case "logout":
      return { token: null, errorMessage: null };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await SecureStore.getItemAsync("token");
  try {
    const response = await AuthApi.post("/api/v1/auth/refresh", null, {
      headers: {
        Accept: "application/json",
      },
    });
    const token = response.data.data.authorization.token;
    await SecureStore.setItemAsync("token", token);
    dispatch({ type: "login", payload: token });
  } catch (err) {
    dispatch({ type: "logout", payload: token });
    navigate("Login");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const register =
  (dispatch) =>
  async ({ username, email, password, name, phoneNumber }) => {
    try {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);
      data.append("name", name);
      data.append("username", username);
      data.append("phone_number", phoneNumber);
      const response = await AuthApi.post("/api/v1/auth/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      const token = response.data.data.authorization.token;
      await SecureStore.setItemAsync("token", token);
      dispatch({ type: "login", payload: token });
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Registrasi gagal, silahkan coba kembali.",
      });
    }
  };

const login =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const data = new FormData();
      data.append("username", email);
      data.append("password", password);
      const response = await AuthApi.post("/api/v1/auth/login", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      const token = response.data.data.authorization.token;
      await SecureStore.setItemAsync("token", token);
      dispatch({ type: "login", payload: token });
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Login gagal, silahkan coba kembali.",
      });
    }
  };

const forget =
  (dispatch) =>
  async ({ email }) => {
    try {
      const data = new FormData();
      data.append("email", email);
      await AuthApi.post("/api/v1/auth/forgot", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Reset password gagal, silahkan coba kembali.",
      });
    }
  };

export const logout = (dispatch) => async () => {
  await SecureStore.deleteItemAsync("token");
  // await AuthApi.post("/api/v1/auth/logout", null, {
  //   headers: {
  //     Accept: "application/json",
  //   },
  // });
  dispatch({ type: "logout" });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { login, logout, register, clearErrorMessage, tryLocalSignin, forget },
  { token: null, errorMessage: null }
);
