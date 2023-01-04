import { Link } from "react-router-dom";

function ChairSideBar() {
  return (
    <div className="card">
      <div className="list-group list-group-flush">
        <Link
          to="/chair-dashboard"
          className="list-group-item list-group-item-action"
        >
          Dashboard
        </Link>
        <Link
          to="/all-courses"
          className="list-group-item list-group-item-action"
        >
          All courses
        </Link>

        <Link
          to="/my-students"
          className="list-group-item list-group-item-action"
        >
          All students
        </Link>
        <Link to="/exam" className="list-group-item list-group-item-action">
          Exams
        </Link>

        <Link
          to="/chair-profile-settings"
          className="list-group-item list-group-item-action"
        >
          Profile Settings
        </Link>
        <Link
          to="/chair-change-password"
          className="list-group-item list-group-item-action"
        >
          Change Password
        </Link>
        <Link
          to="/chair-logout"
          className="list-group-item list-group-item-action text-danger"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}

export default ChairSideBar;
