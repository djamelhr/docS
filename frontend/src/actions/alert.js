import { v4 } from "uuid";
import { REMOVE_ALERT, SET_ALERT } from "./types";

export const setAlert = (msg, alertType) => (dispatch) => {
  // console.log(id);
  const id = v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
