import React, { useEffect, useState } from "react";
import "./chairprofile.css";
// const baseUrl = "http://127.0.0.1:8000/api";

const ChairProfile = () => {
  const [user, setUser] = useState({});
  const chairId = localStorage.getItem("chairId");

  useEffect(() => {
    // Fetch user data from an API
    fetch(`http://127.0.0.1:8000/api/chairman/${chairId}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, [chairId]);

  return (
    <div className="teacher-prof-container">
      {user.full_name && (
        <>
          <img
            src={user.profile_img}
            alt={user.full_name}
            className="rounded-img"
          />
          <p>{user.full_name}</p>
        </>
      )}
    </div>
  );
};

export default ChairProfile;
