import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function Login() {
  const [studentLoginData, setstudentLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, seterrorMsg] = useState("");

  const handleChange = (event) => {
    setstudentLoginData({
      ...studentLoginData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = () => {
    const StudentFormData = new FormData();
    StudentFormData.append("email", studentLoginData.email);
    StudentFormData.append("password", studentLoginData.password);
    try {
      axios.post(baseUrl + "/user-login/", StudentFormData).then((res) => {
        if (res.data.bool === true) {
          localStorage.setItem("studentLoginStatus", true);
          localStorage.setItem("studentteacherId", res.data.student_id);
          localStorage.setItem("studentId", res.data.student_id);

          window.location.href = "/user-dashboard";
        } else {
          seterrorMsg("Invalid Email or Password!");
        }
      });
    } catch (error) {
      console.log("error");
    }
  };

  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus === "true") {
    window.location.href = "/user-dashboard";
  }

  useEffect(() => {
    document.title = "Student Login";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">Student Login</h5>
            <div className="card-body">
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  value={studentLoginData.email}
                  name="email"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  value={studentLoginData.password}
                  name="password"
                  onChange={handleChange}
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              <button
                type="submit"
                onClick={submitForm}
                className="btn btn-primary"
              >
                Login
              </button>
              <p className="mt-3">
                <Link to="/user-forgot-password" className="text-danger">
                  Forgot Password?
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
