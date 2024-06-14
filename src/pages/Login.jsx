import React, { useState, useEffect } from 'react';
import ApiCaller from '../services/apiService';
import { useNavigate } from 'react-router-dom';
const apiService = ApiCaller();

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
          window.dispatchEvent(new Event("storage"));
        } else {
          alert(response?.data?.message)
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

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="card" style={{ maxWidth: '500px', width: '100%', padding: '50px', borderRadius: '20px' }}>
          <div className="card-body">
            <h1 className="card-title text-center">Login</h1>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                id="username"
                value={username}
                placeholder='Enter User Name'
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
                placeholder='Enter Password'
                onChange={(e) => {
                  setPassword(e.target.value);
                  validateField('password', e.target.value);
                }}
                onBlur={(e) => validateField('password', e.target.value)}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div className="mt-3 text-center">
              <button type="button" className="btn btn-success btn-lg btn-block px-5 my-3" onClick={loginData}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
