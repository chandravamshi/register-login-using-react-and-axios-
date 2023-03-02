import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../App.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

export default function LoginPage({ setUserState }) {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    // if (!formErrors) {

    // }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      axios.post("http://localhost:5000/user/login-user", user).then((res) => {
        //alert(res);
        console.log(res);
        setUserState(res.data.data);
        navigate("/", { replace: true });
      });
    }
  }, [formErrors]);
  return (
    <div style={divStyle}>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={changeHandler}
          />
          <small class="text-danger">{formErrors.email}</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={changeHandler}
          />
          <small class="text-danger">{formErrors.password}</small>
        </div>
        <button
          type="submit"
          class="btn btn-primary m-2"
          onClick={loginHandler}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export const divStyle = {
  margin: "auto",
  width: "50%",
  padding: "10px",
  "margin-top": "50px",
};
