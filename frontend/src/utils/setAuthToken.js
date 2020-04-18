import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    // hena derna brk token f header
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
