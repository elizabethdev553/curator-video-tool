import PropTypes from 'prop-types';
import React, { ChangeEvent, FormEvent,useState} from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { login } from '../../actions/auth';

interface LoginProps {
  login: (email: string, password: string) => void;
  isAuthenticated?: boolean;
  user:any
}


const Login: React.FC<LoginProps> = ({ login, isAuthenticated, user }) => {
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
    return <Navigate to="/checked-list" />;
    else
    return  <Navigate to="/assigned-list" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
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
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
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
});

export default connect(mapStateToProps, { login })(Login);
