import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/authAction";

const Register = ({ alert }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    datebirth: "",
    gender: "",
  });

  const { name, email, password, password2, datebirth, gender } = formData;

  //redux hooks
  //const getAlert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  // const getAlert = useSelector((state) => state.alert);
  // console.log(alert);
  // console.log(getAlert);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert("password do bti match", "danger"));

      //dispatch(removeAlert());
      // setAlert.map(alert=>{

      // })

      console.log("passwords do not match");
    } else {
      dispatch(register({ name, email, password, datebirth, gender }));
      console.log(formData);
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form
        className="form"
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            onChange={(e) => onChange(e)}
            value={password}
            placeholder="Password"
            name="password"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            onChange={(e) => onChange(e)}
            value={password2}
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            placeholder="Date of birth"
            name="datebirth"
            onChange={(e) => onChange(e)}
            value={datebirth}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="gender"
            name="gender"
            onChange={(e) => onChange(e)}
            value={gender}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
