import React, { useState } from 'react';
import ApiCaller from '../services/apiService';
import { useNavigate } from 'react-router-dom';
const apiService = ApiCaller();

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    const usernameRegex = /^[a-zA-Z0-9]*$/;

    if (name === 'username') {
      if (!value) {
        error = 'Username is required';
      } else if (!usernameRegex.test(value)) {
        error = 'Username should not contain special characters';
      }
    } else if (name === 'password') {
      if (!value) {
        error = 'Password is required';
      } else if (value.length <= 8) {
        error = 'Password must be more than 8 characters long';
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const loginData = async () => {
    if (validateForm()) {
      try {
        const url = "https://dummyjson.com/auth/login";
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
  
        const response = await apiService.apiCall("post", url, formData);
        console.log("response::", response)
        
        if (response?.status === 200) {
          console.log("inside if",response)
          const accessToken = response?.data?.token
          console.log(accessToken)
          localStorage.setItem("accessToken", accessToken)
          localStorage.setItem("isLoggedIn", true)
          navigate("/products")
        } 
      } catch (error) {
        console.log("login error:", error);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const usernameRegex = /^[a-zA-Z0-9]*$/;

    if (!username) {
      newErrors.username = 'Username is required';
    } else if (!usernameRegex.test(username)) {
      newErrors.username = 'Username should not contain special characters';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length <= 8) {
      newErrors.password = 'Password must be more than 8 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <div className="card mx-auto mt-5" style={{ width: '18rem' }}>
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                validateField('username', e.target.value);
              }}
              onBlur={(e) => validateField('username', e.target.value)}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField('password', e.target.value);
              }}
              onBlur={(e) => validateField('password', e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="mt-3 text-center">
            <button type="button" className="btn btn-success btn-md btn-block" onClick={loginData}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
