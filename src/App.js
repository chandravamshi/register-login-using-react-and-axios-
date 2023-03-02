import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/pages/LandingPage";

import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ProfilePage from "./components/pages/ProfilePage";

import { useState } from "react";

function App() {

  const [userstate, setUserState] = useState({});
  console.log(userstate);
  return (
    <Router>
      <div>
        <Routes>
        <Route
            path="/"
            element={
              userstate && userstate.userId ? (
                <ProfilePage
                  setUserState={setUserState}
                  username={userstate.userId}
                />
              ) : (
                <LoginPage setUserState={setUserState} />
              )
            }
          ></Route>
          <Route exact path="/login" element={<LoginPage setUserState={setUserState}/>}  />

          <Route exact path="/register" element={<RegisterPage  setUserState={setUserState}/>}  />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
