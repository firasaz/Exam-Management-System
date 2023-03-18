import { Link } from "react-router-dom";
import TeacherProfile from "./Teacher/teacherprofile";
import ChairProfile from "./chairman/chairprofile";
import UserProfile from "./User/userprofile";

function Header() {
  const chairLoginStatus = localStorage.getItem("chairLoginStatus");
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  const teacherName = localStorage.getItem("teacherName");
  const studentName = localStorage.getItem("studentName");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="#">
          EMS for EMU
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            {(studentLoginStatus || teacherLoginStatus === "true") && (
              <>
                <Link className="nav-item nav-link active" to="/">
                  Home
                </Link>
                <Link className="nav-item nav-link" to="/category">
                  Category
                </Link>
                <Link className="nav-item nav-link" to="/all-courses">
                  Courses
                </Link>
              </>
            )}

            {chairLoginStatus === "true" && (
              <>
                <Link className="nav-item nav-link active" to="/">
                  Home
                </Link>
                <Link className="nav-item nav-link" to="/all-courses">
                  Courses
                </Link>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Chairman
                  </Link>
                  <ul className="dropdown-menu">
                    {chairLoginStatus === "true" && (
                      <>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/chair-profile-setting"
                          >
                            <ChairProfile />
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/chair-dashboard">
                            Dashboard
                          </Link>
                          <Link className="dropdown-item" to="/chair-logout">
                            Logout
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
              </>
            )}

            {teacherLoginStatus === "true" && (
              <>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {teacherName}
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/teacher-dashboard">
                        Dashboard
                      </Link>
                      <Link className="dropdown-item" to="/teacher-logout">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}

            {studentLoginStatus === "true" && (
              <>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {studentName}
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/teacher-dashboard">
                        Dashboard
                      </Link>
                      <Link className="dropdown-item" to="/teacher-logout">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
