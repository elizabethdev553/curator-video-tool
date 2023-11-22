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


  const admin = (
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

  const curator = (
    <Fragment >
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

  if (user) {
    if (user.email == 'goldwolf.dev@gmail.com') {
      authLinks = admin;
    } else {
      authLinks = curator;
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
        <Fragment>{isAuthenticated ? authLinks : ''}</Fragment>
        </ul>
      </nav>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
