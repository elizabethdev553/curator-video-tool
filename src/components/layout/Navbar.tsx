import React, { Fragment,useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

interface NavbarProps {
  logout: () => void;
  auth: {
    isAuthenticated: boolean;
    user:any
  };
}
let authLinks:any

const Navbar: React.FC<NavbarProps> = ({ auth: { isAuthenticated, user },  logout }) => {

  // const [authLinks, setAuthLinks]= useState('')

 
  const admin = (
    <ul>   
      <li>
        <Link to="/assignment">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Assignment</span>
        </Link>
      </li>
      <li>
        <Link to="/checked-list">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Checked List</span>
        </Link>
      </li>
      {/* <li>
        <Link to="/">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Performance results</span>
        </Link>
      </li> */}
      <li>
        <Link to="/curators-list">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Curators list</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const curator = (
    <ul className=''>   
      <li>
        <Link to="/assigned-list">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Curator Panel</span>
        </Link>
      </li>
      {/* <li>
        <Link to="/curator-panel/check/:id">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Video Check</span>
        </Link>
      </li> */}
     
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  if(user){
    if(user.email=='goldwolf.dev@gmail.com'){
      authLinks= admin;

    }else{
      authLinks= curator;
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
      <Fragment>{isAuthenticated?authLinks:''}</Fragment>
    </nav>
    </React.Fragment>
  );
};


const mapStateToProps = (state:any) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
