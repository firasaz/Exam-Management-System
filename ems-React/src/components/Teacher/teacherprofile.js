import React, { useEffect, useState } from "react";
import "./teacherprofile.css";
// const baseUrl = "http://127.0.0.1:8000/api";

const TeacherProfile = () => {
  const [user, setUser] = useState({});
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    // Fetch user data from an API
    fetch(`http://127.0.0.1:8000/api/teacher/${teacherId}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, [teacherId]);

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

export default TeacherProfile;
