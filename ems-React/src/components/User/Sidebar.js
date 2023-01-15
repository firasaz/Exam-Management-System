import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function Sidebar() {
  const [notifData, setnotifData] = useState([]);
  const studentId = localStorage.getItem("studentId");
  useEffect(() => {
    // Fetch Courses
    try {
      axios
        .get(baseUrl + "/student/fetch-all-notifications/" + studentId)
        .then((res) => {
          console.log(res);
          setnotifData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="card">
      <div className="list-group list-group-flush">
        <Link
          to="/user-dashboard"
          className="list-group-item list-group-item-action"
        >
          Dashboard
        </Link>
        <Link
          to="/my-courses"
          className="list-group-item list-group-item-action"
        >
          My Courses
        </Link>
        <Link
          to="/my-teachers"
          className="list-group-item list-group-item-action"
        >
          My Teachers
        </Link>
        <Link
          to="/my-assignments"
          className="list-group-item list-group-item-action"
        >
          Assignments{" "}
          <span className="float-end badge bg-danger mt-1">
            {notifData.length}
          </span>
        </Link>
        <Link
          to="/profile-setting"
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
          to="/user-logout"
          className="list-group-item list-group-item-action text-danger"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
