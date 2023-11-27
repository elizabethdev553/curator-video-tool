import PropTypes from 'prop-types';
import React, { ChangeEvent, FormEvent,useState} from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import {Alert} from 'antd'
import { login } from '../../actions/auth';

interface LoginProps {
  login: (email: string, password: string) => void;
  isAuthenticated?: boolean;
  user:any,
  errors:any
}


const Login: React.FC<LoginProps> = ({ login, isAuthenticated, user, errors }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  
  const { email, password } = formData;

  const onChange = (e:ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated&&user) {
    if(user.handle === 'goldwolf')
    return <Navigate to="/video-list" />;
    else
    return  <Navigate to="/assigned-list" />;
  }

 
    const errors_tmp = (
      <Alert
      message="Warning"
      description={errors}
      type="warning"
      showIcon
      closable
    />
    )
  return (
      <section className="container login">
        {errors ? errors_tmp:''}
        <h1 className="large text-primary mb-5">Sign In</h1>
        <p className="lead mt-4 mb-4">
          Sign Into Your Account
        </p>
        <form className="form mt-5 mb-5" onSubmit={onSubmit}>
          <div className="form-group mt-4 mb-4">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              className="form-control-lg"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength={6}
              className='form-control-lg'
            />
          </div>
          <div>
          <input type="submit" className="btn btn-primary btn-lg form-control mt-4 mb-4" value="Login" />
          </div>
        </form>
      </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state:any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user:state.auth.user,
  errors:state.auth.errors
});

export default connect(mapStateToProps, { login })(Login);
