import React from "react";

import { Link } from "react-router-dom";

import "../../App.css";

export default function LandingPage() {
  return (
    <header style={HeaderStyle}>
      <h1>Login / Register </h1>

      <div>
        <Link to="/login">
          <button type="button" class="btn btn-secondary m-2">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button type="button" class="btn btn-secondary">
            Register
          </button>
        </Link>
      </div>
    </header>
  );
}

const HeaderStyle = {
  display: "flex",
  "justify-content": "center",
  "flex-direction": "column",
  "flex-wrap": "nowrap",
  "align-items": "center",
};
