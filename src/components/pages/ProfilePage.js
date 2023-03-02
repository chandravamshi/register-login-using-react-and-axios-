import React from "react";
export default function ProfilePage({ setUserState, username }) {
    console.log(username)
  return (
    
    <div className="profile">
      <h1 style={{ color: "red" }}>Welcome {username} !!</h1>
      <button onClick={() => setUserState({})}>Logout</button>
    </div>
  );
}
