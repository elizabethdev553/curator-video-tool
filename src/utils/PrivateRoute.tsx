import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Spinner from '../components/layout/Spinner';


interface AuthProps {
  auth: {
    isAuthenticated: boolean;
    user:any
  };
}
interface PrivateRouteProps {
  component: React.FC<AuthProps>;
  auth: {
    isAuthenticated: boolean;
    loading: boolean;
    user:any
  };
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, auth }) => {

  if (auth.loading) return <Spinner />;
  if (auth.isAuthenticated) return <Component auth={auth} />;

  return <Navigate to="/" />;
};

const mapStateToProps = (state:any) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
