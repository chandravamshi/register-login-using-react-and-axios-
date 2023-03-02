import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useNavigate, NavLink } from "react-router-dom";

import "../../App.css";

import { divStyle } from "./LoginPage";

import axios from "axios";

export default function RegisterPage({ setUserState }) {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [newUserDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...newUserDetails,
      [name]: value,
    });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(newUserDetails);
      axios
        .post("http://localhost:5000/user/create-user", newUserDetails)
        .then((res) => {
          //alert(res);
          console.log(res);
          setUserState(res.data.data);
          navigate("/", { replace: true });
        });
    }
  }, [formErrors]);

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
    if (!values.firstName) {
      error.firstName = "firstName is required";
    }
    if (!values.lastName) {
      error.lastName = "lastName is required";
    }
    return error;
  };
  const registrationHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(newUserDetails));
    setIsSubmit(true);
    // if (!formErrors) {

    // }
  };
  return (
    <div style={divStyle}>
      <form>
        <div class="form-group m-2">
          <label for="firstName">First Name</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            name="firstName"
            placeholder="Name"
            onChange={changeHandler}
          />
          <small class="text-danger">{formErrors.firstName}</small>
        </div>
        <div class="form-group m-2">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            name="lastName"
            placeholder="Name"
            onChange={changeHandler}
          />
          <small class="text-danger">{formErrors.lastName}</small>
        </div>
        <div class="form-group m-2">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            onChange={changeHandler}
          />
          <small class="text-danger">{formErrors.email}</small>
        </div>
        <div class="form-group m-2">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            placeholder="Password"
            onChange={changeHandler}
          />
          <small class="text-danger">{formErrors.password}</small>
        </div>
        <button
          type="submit"
          class="btn btn-primary m-2"
          onClick={registrationHandler}
        >
          Register
        </button>
      </form>
    </div>
  );
}
