import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/authAction";
const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  console.log(isAuthenticated, loading);
  const authLinks = (
    <ul>
      <li>
        <Link onClick={() => dispatch(logout())} to="/">
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <a href="!#">Developers</a>
      </li>
      <li>
        <Link to="register">Register</Link>
      </li>
      <li>
        <Link to="login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fa-code"></i> DevConnector
        </Link>
      </h1>
      {<Fragment>{isAuthenticated ? authLinks : guestLinks} </Fragment>}
    </nav>
  );
};

export default Navbar;
