import * as SecureStore from "expo-secure-store";
import createDataContext from "./createDataContext";
import AuthApi from "../api/auth";
import { navigate } from "../RootNavigation";

const dataReducer = (state, action) => {
  switch (action.type) {
    case "add_user":
      return { ...state, user: action.payload };
    case "add_statistic":
      return { ...state, statistic: action.payload };
    case "add_member":
      return { ...state, member: action.payload };
    case "add_member_detail":
      return { ...state, memberDetail: action.payload };
    case "add_position_spinner":
      return { ...state, positionSpinner: action.payload };
    case "add_register_status_spinner":
      return { ...state, registerStatusSpinner: action.payload };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: null };
    case "set_loading":
      return { ...state, isLoading: action.payload };
    case "set_more_loading":
      return { ...state, isMoreLoading: action.payload };
    case "add_savings":
      return { ...state, savings: [...state.savings, ...action.payload] };
    case "clear_savings":
      return { ...state, savings: [] };
    case "add_savings_meta":
      return { ...state, savingsMeta: action.payload };
    default:
      return state;
  }
};

const getData = (dispatch) => async () => {
  dispatch({ type: "set_loading", payload: true });
  try {
    const response = await AuthApi.get("/api/v1/dashboard", {
      headers: {
        Accept: "application/json",
      },
    });
    const user = response.data.data.user;
    const statistic = response.data.data.statistic;
    const member = response.data.data.anggota;
    dispatch({ type: "add_user", payload: user });
    dispatch({ type: "add_statistic", payload: statistic });
    dispatch({ type: "add_member", payload: member });
  } catch (err) {
    console.log("error from getData", err);
    if (err.response.status === 401) {
      await SecureStore.deleteItemAsync("token");
    }
    if (err.response.status === 404) {
      return;
    }
    dispatch({
      type: "add_error",
      payload: "Kesalahan koneksi, silahkan coba kembali.",
    });
  }
};

const getMemberData = (dispatch) => async () => {
  try {
    const response = await AuthApi.get("/api/v1/anggota", {
      headers: {
        Accept: "application/json",
      },
    });
    const member = response.data.data.anggota;
    const memberDetail = response.data.data.detail;
    dispatch({ type: "add_member", payload: member });
    dispatch({ type: "add_member_detail", payload: memberDetail });
    dispatch({ type: "set_loading", payload: false });
  } catch (err) {
    console.log("error from getMemberData", err);
    console.log(err.response.status);
    dispatch({ type: "set_loading", payload: false });
    if (err.response.status === 401) {
      await SecureStore.deleteItemAsync("token");
    }
    if (err.response.status === 404) {
      console.log("back");
      return;
    }
    dispatch({
      type: "add_error",
      payload: "Kesalahan koneksi, silahkan coba kembali.",
    });
  }
};

const getPositionData = (dispatch) => async () => {
  try {
    const response = await AuthApi.get("/api/v1/jabatan/spinner", {
      headers: {
        Accept: "application/json",
      },
    });
    const positionSpinner = response.data.data;
    dispatch({ type: "add_position_spinner", payload: positionSpinner });
  } catch (err) {
    console.log("error from getPositionData", err);
    if (err.response.status === 401) {
      await SecureStore.deleteItemAsync("token");
    }
    if (err.response.status === 404) {
      return;
    }
    dispatch({
      type: "add_error",
      payload: "Kesalahan koneksi, silahkan coba kembali.",
    });
  }
};

const getRegisterStatus = (dispatch) => async () => {
  try {
    const response = await AuthApi.get(
      "/api/v1/anggota/register/status/spinner",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const registerStatusSpinner = response.data.data;
    dispatch({
      type: "add_register_status_spinner",
      payload: registerStatusSpinner,
    });
  } catch (err) {
    console.log("error from getStatus", err);
    if (err.response.status === 401) {
      await SecureStore.deleteItemAsync("token");
    }
    if (err.response.status === 404) {
      return;
    }
    dispatch({
      type: "add_error",
      payload: "Kesalahan koneksi, silahkan coba kembali.",
    });
  }
};

const registerMember =
  (dispatch) =>
  async ({
    name,
    nip,
    files,
    instalment,
    memberType,
    autoDebet,
    bank,
    bankNumber,
  }) => {
    try {
      const data = new FormData();
      data.append("anggota_name", name);
      data.append("nip", nip);
      data.append("cicilan", instalment);
      data.append("tipe_anggota", memberType);
      data.append("is_autodebet", autoDebet);
      data.append("bank_id", bank);
      data.append("no_rekening", bankNumber);
      for (const file of files) {
        data.append("files[]", file);
      }
      const response = await AuthApi.post("/api/v1/anggota/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      const anggota = response.data.data.anggota;
      dispatch({ type: "add_member", payload: anggota });
      navigate("RegisterSuccess");
    } catch (err) {
      if (err.response.status === 401) {
        await SecureStore.deleteItemAsync("token");
      }
      dispatch({
        type: "add_error",
        payload: "Pendaftaran anggota gagal, silahkan coba kembali.",
      });
    }
  };

const editMember =
  (dispatch) =>
  async ({
    name,
    nip,
    files,
    instalment,
    memberType,
    autoDebet,
    id,
    bank,
    bankNumber,
  }) => {
    try {
      const data = new FormData();
      data.append("anggota_name", name);
      data.append("nip", nip);
      data.append("cicilan", instalment);
      data.append("tipe_anggota", memberType);
      data.append("is_autodebet", autoDebet);
      data.append("bank_id", bank);
      data.append("no_rekening", bankNumber);
      for (const file of files) {
        data.append("files[]", file);
      }
      const response = await AuthApi.post(
        `/api/v1/anggota/register/edit/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      const anggota = response.data.data.anggota;
      dispatch({ type: "add_member", payload: anggota });
      navigate("RegisterSuccess");
    } catch (err) {
      console.log(err.response);
      if (err.response.status === 401) {
        await SecureStore.deleteItemAsync("token");
      }
      dispatch({
        type: "add_error",
        payload: "Ubah data gagal, silahkan coba kembali.",
      });
    }
  };

const resign =
  (dispatch) =>
  async ({ files }) => {
    try {
      const data = new FormData();
      for (const file of files) {
        data.append("files[]", file);
      }
      await AuthApi.post(`/api/v1/anggota/resign`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      navigate("RegisterSuccess");
    } catch (err) {
      if (err.response.status === 401) {
        await SecureStore.deleteItemAsync("token");
      }
      dispatch({
        type: "add_error",
        payload: "Ubah data gagal, silahkan coba kembali.",
      });
    }
  };

const editResign =
  (dispatch) =>
  async ({ files, id }) => {
    try {
      const data = new FormData();
      for (const file of files) {
        data.append("files[]", file);
      }
      await AuthApi.post(`/api/v1/anggota/resign/edit/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      navigate("RegisterSuccess");
    } catch (err) {
      if (err.response.status === 401) {
        await SecureStore.deleteItemAsync("token");
      }
      dispatch({
        type: "add_error",
        payload: "Ubah data gagal, silahkan coba kembali.",
      });
    }
  };

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const getSavings = (dispatch) => async () => {
  try {
    dispatch({ type: "set_loading", payload: true });
    dispatch({ type: "clear_savings", payload: true });
    const response = await AuthApi.get(`/api/v1/simpanan`, {
      headers: {
        Accept: "application/json",
      },
    });
    dispatch({
      type: "add_savings",
      payload: response.data.data,
    });
    dispatch({
      type: "add_savings_meta",
      payload: response.data.links,
    });
    dispatch({ type: "set_loading", payload: false });
  } catch (err) {
    dispatch({ type: "set_loading", payload: false });
    if (err.response.status === 401) {
      await SecureStore.deleteItemAsync("token");
    }
    dispatch({
      type: "add_error",
      payload: "list simpanan gagal. silahkan coba kembali.",
    });
  }
};

const getMoreSavings = (dispatch) => async (page) => {
  try {
    dispatch({ type: "set_more_loading", payload: true });
    console.log("get simpanan lagi", page);
    const response = await AuthApi.get(`/api/v1/simpanan?page=${page}`, {
      headers: {
        Accept: "application/json",
      },
    });
    dispatch({
      type: "add_savings",
      payload: response.data.data,
    });
    dispatch({
      type: "add_savings_meta",
      payload: response.data.links,
    });
    dispatch({ type: "set_more_loading", payload: false });
  } catch (err) {
    dispatch({ type: "set_more_loading", payload: false });
    if (err.response.status === 401) {
      await SecureStore.deleteItemAsync("token");
    }
    dispatch({
      type: "add_error",
      payload: "list simpanan gagal. silahkan coba kembali.",
    });
  }
};

const confirmSavings =
  (dispatch) =>
  async ({ amount, month, year, files, source, type }) => {
    try {
      const data = new FormData();
      data.append("amount", amount);
      data.append("bulan", month);
      data.append("tahun", year);
      data.append("source", source);
      data.append("type", type);
      for (const file of files) {
        data.append("files[]", file);
      }
      await AuthApi.post(`/api/v1/simpanan/confirmation`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      navigate("RegisterSuccess");
    } catch (err) {
      console.log(err.response);
      if (err.response.status === 401) {
        await SecureStore.deleteItemAsync("token");
      }
      dispatch({
        type: "add_error",
        payload: "Upload konfirmasi gagal, silahkan coba kembali.",
      });
    }
  };

const setLoading = (dispatch) => (payload) => {
  dispatch({ type: "set_loading", payload });
};

export const { Provider, Context } = createDataContext(
  dataReducer,
  {
    getData,
    registerMember,
    clearErrorMessage,
    getMemberData,
    editMember,
    getPositionData,
    getRegisterStatus,
    resign,
    editResign,
    getSavings,
    getMoreSavings,
    setLoading,
    confirmSavings,
  },
  {
    user: null,
    member: null,
    statistic: null,
    errorMessage: null,
    memberDetail: null,
    positionSpinner: null,
    registerStatusSpinner: null,
    isLoading: true,
    isMoreLoading: false,
    savings: [],
    savingsMeta: null,
  }
);
