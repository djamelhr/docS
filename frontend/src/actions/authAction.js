import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
//load User zaama hena dima chekiw ida kyen token or no

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:3000/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = ({
  name,
  email,
  password,
  datebirth,
  gender,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //request body
  const body = JSON.stringify({ name, email, password, datebirth, gender });
  try {
    const res = await axios.post(
      "http://localhost:3000/api/users",
      body,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    console.log(errors);
    const errors = error.response.data.errors;
    errors.forEach((err) => {
      dispatch(setAlert(err.msg, "danger"));
    });
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //request body
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth",
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    console.log("faild", error);
    const errors = error.response.data.errors;
    errors.forEach((err) => {
      dispatch(setAlert(err.msg, "danger"));
    });
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
