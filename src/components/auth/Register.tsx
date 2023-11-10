import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './auth.css'; 

const RegisterComponent = () => {
  const [formData, setFormData] = useState({
    memberId:'',
    handle: '',
    email: '',
    password: '',
    password2: ''
  });

  //const [alert, setAlert] = useState(false);
  const { memberId, handle, email, password, password2 } = formData;
  const navigate = useNavigate();
  const onChange = (e: any) =>   
     setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== password2) {
      //setAlert(true);
      alert("Passwords do not match");
    }
    try {
      const { password2, ...data } = formData;
      console.log("data", data);
      const response = await axios.post('http://localhost:5000/api/members',  data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.status == 200){
        console.log("response=>>>>", response.data);
        localStorage.setItem("authData", response.data);
        navigate('/');
      }
      
      // Do something with the user data
    } catch (error) {
      console.log(error, 'Fetch CuratorList Error');
    }
  };

  // if (isAuthenticated) {
  //   return <Navigate to="/dashboard" />;
  // }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="MemberId"
            name="memberId"
            value={memberId}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Handle"
            name="handle"
            value={handle}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

export default RegisterComponent;
