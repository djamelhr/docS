import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { setAlert } from "../../actions/alert";
import { login } from "../../actions/authAction";
const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(login({ email, password }));
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }
  return (
    <Fragment>
      <h1>{isAuthenticated ? "true" : "false"}</h1>
      <h1 className="large text-primary">Sign IN</h1>
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
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
