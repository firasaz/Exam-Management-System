import { Link } from "react-router-dom";

function TeacherSideBar() {
  return (
    <div className="card">
      <div className="list-group list-group-flush">
        <Link
          to="/teacher-dashboard"
          className="list-group-item list-group-item-action"
        >
          Dashboard
        </Link>
        <Link
          to="/teacher-courses"
          className="list-group-item list-group-item-action"
        >
          My courses
        </Link>
        <Link
          to="/add-course"
          className="list-group-item list-group-item-action"
        >
          Add course
        </Link>
        <Link
          to="/my-students"
          className="list-group-item list-group-item-action"
        >
          My students
        </Link>
        <Link
          to="/teacher-calendar"
          className="list-group-item list-group-item-action"
        >
          Calendar
        </Link>
        <Link
          to="/teacher-profile-settings"
          className="list-group-item list-group-item-action"
        >
          Profile Settings
        </Link>
        <Link
          to="/teacher-change-password"
          className="list-group-item list-group-item-action"
        >
          Change Password
        </Link>
        <Link
          to="/teacher-logout"
          className="list-group-item list-group-item-action text-danger"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}

export default TeacherSideBar;
