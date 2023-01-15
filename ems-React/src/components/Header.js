import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const chairLoginStatus = localStorage.getItem("chairLoginStatus");
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  const [searchstring, setSearchString] = useState({
    search: "",
  });

  const handleChange = (event) => {
    setSearchString({
      ...searchstring,
      [event.target.name]: event.target.value,
    });
  };

  function searchCourse() {
    if (searchstring.search !== "") {
      window.location.href = "/search/" + searchstring.search;
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="#">
          EMS for EMU
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <form className="d-flex">
          {(studentLoginStatus ||
            teacherLoginStatus ||
            chairLoginStatus === "true") && (
            <>
              <input
                onClick={handleChange}
                name="search"
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              ></input>

              <button
                onClick={searchCourse}
                className="btn btn-warning"
                type="button"
              >
                Search
              </button>
            </>
          )}
        </form>
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
              </>
            )}

            {teacherLoginStatus !== "true" && (
              <>
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
                    {chairLoginStatus !== "true" && (
                      <>
                        <li>
                          <Link
                            className="nav-item dropdown-item"
                            to="/chair-login"
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="nav-item dropdown-item"
                            to="/chair-register"
                          >
                            Register
                          </Link>
                        </li>
                      </>
                    )}
                    {chairLoginStatus === "true" && (
                      <>
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

            {studentLoginStatus !== "true" && (
              <>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Teacher
                  </Link>
                  <ul className="dropdown-menu">
                    {teacherLoginStatus !== "true" && (
                      <>
                        <li>
                          <Link
                            className="nav-item dropdown-item"
                            to="/teacher-login"
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="nav-item dropdown-item"
                            to="/teacher-register"
                          >
                            Register
                          </Link>
                        </li>
                      </>
                    )}
                    {teacherLoginStatus === "true" && (
                      <>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/teacher-dashboard"
                          >
                            Dashboard
                          </Link>
                          <Link className="dropdown-item" to="/teacher-logout">
                            Logout
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
              </>
            )}
            {teacherLoginStatus !== "true" && (
              <>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Student
                  </Link>
                  <ul className="dropdown-menu">
                    {studentLoginStatus !== "true" && (
                      <>
                        <li>
                          <Link
                            className="nav-item dropdown-item"
                            to="/user-login"
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="nav-item dropdown-item"
                            to="/user-register"
                          >
                            Register
                          </Link>
                        </li>
                      </>
                    )}
                    {studentLoginStatus === "true" && (
                      <>
                        <li>
                          <Link className="dropdown-item" to="/user-dashboard">
                            Dashboard
                          </Link>
                          <Link className="dropdown-item" to="/user-logout">
                            Logout
                          </Link>
                        </li>
                      </>
                    )}
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
