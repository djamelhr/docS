import React from "react";
import { useSelector, useDispatch } from "react-redux";
//import { removeAlert } from "../../actions/alert";

const Alert = () => {
  const getAlert = useSelector((state) => state.alert);

  return (
    getAlert !== null &&
    getAlert.length > 0 &&
    getAlert.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
  );
};

export default Alert;
