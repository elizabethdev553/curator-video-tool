import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../actions/auth';

interface NavbarProps {
  logout: () => void;
  auth: {
    isAuthenticated: boolean;
    user: any;
  };
}
let authLinks: any;

const Navbar: React.FC<NavbarProps> = ({ auth: { isAuthenticated, user }, logout }) => {
  const authority_admin = (
    <Fragment>
      <li>
        <Link to="/video-list">
          <i className="fas fa-user" /> <span className="hide-sm">Video List</span>
        </Link>
      </li>
      <li>
        <Link to="/curator-list">
          <i className="fas fa-user" /> <span className="hide-sm">Curators list</span>
        </Link>
      </li>

      <li>
        <a onClick={logout} href="#">
          <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const authority_admin_curator = (
    <Fragment>
      <li>
        <Link to="/video-list">
          <i className="fas fa-user" /> <span className="hide-sm">Video List</span>
        </Link>
      </li>
      <li>
        <Link to="/assigned-list">
          <i className="fas fa-user" /> <span className="hide-sm">Curator Panel</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#">
          <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const authority_curator = (
    <Fragment>
      <li>
        <Link to="/assigned-list">
          <i className="fas fa-user" /> <span className="hide-sm">Curator Panel</span>
        </Link>
      </li>

      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guest = (
    <Fragment>
      <li>
        <Link to="/register">
          <i className="fas fa-user" /> <span className="hide-sm">Register</span>
        </Link>
      </li>
      <li>
        <Link to="/">
          <i className="fas fa-user" /> <span className="hide-sm">Login</span>
        </Link>
      </li>
    </Fragment>
  );

  if (user) {
    switch (user.authority) {
      case 'leader':
        authLinks = authority_admin;
        break;
      case 'admin':
        authLinks = authority_admin_curator;
        break;
      case 'curator':
        authLinks = authority_curator;
        break;
      default:
        break;
    }
  }
  return (
    <React.Fragment>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-setting" /> Curators Tool
          </Link>
        </h1>
        <ul>
          <Fragment>{isAuthenticated ? authLinks : guest}</Fragment>
        </ul>
      </nav>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
