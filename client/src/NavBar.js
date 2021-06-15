import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export const NavBar = props => {
  const history = useHistory();
  const { loggedIn, onLogout } = props;

  const handleLogout = () => {
    onLogout();
    history.push('/');
  };

  if (loggedIn) {
    return (
      <nav className="navbar">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">Home</Link>
          <Link className="navbar-item" to="/jobs/new">Post Job</Link>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="navbar-item" onClick={handleLogout}>Logout</a>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-start">
        <Link className="navbar-item" to="/">Home</Link>
        <Link className="navbar-item" to="/login">Login</Link>
      </div>
    </nav>
  );
};
