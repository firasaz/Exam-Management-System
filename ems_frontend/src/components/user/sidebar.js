import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

function SideBar() {
  const [notifData, setNotifData] = useState([]);
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    try {
      axios
        .get(baseUrl + "/student/fetch-all-notifications/" + studentId)
        .then((res) => {
          console.log(res);
          setNotifData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="card">
      <div className="list-group list-group-flush">
        <Link
          to="/student-dashboard"
          className="list-group-item list-group-item-action"
        >
          Dashboard
        </Link>
        <Link
          to="/my-courses"
          className="list-group-item list-group-item-action"
        >
          My courses
        </Link>
        <Link
          to="/my-assignments"
          className="list-group-item list-group-item-action"
        >
          My Assignments
          <span className="float-end badge bg-danger mt-1">
            {notifData.length}
          </span>
        </Link>

        <Link
          to="/student-calendar"
          className="list-group-item list-group-item-action"
        >
          Calendar
        </Link>
        <Link
          to="/profile-settings"
          className="list-group-item list-group-item-action"
        >
          Profile Settings
        </Link>
        <Link
          to="/change-password"
          className="list-group-item list-group-item-action"
        >
          Change Password
        </Link>
        <Link
          to="/student-logout"
          className="list-group-item list-group-item-action text-danger"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
