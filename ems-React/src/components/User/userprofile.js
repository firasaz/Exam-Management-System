import React, { useEffect, useState } from "react";
import "./userprofile.css";
// const baseUrl = "http://127.0.0.1:8000/api";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    // Fetch user data from an API
    fetch(`http://127.0.0.1:8000/api/student/${studentId}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, [studentId]);

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

export default UserProfile;
