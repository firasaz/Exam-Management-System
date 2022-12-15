// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

function TeacherLogin() {
  const [teacherLoginData, setTeacherLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    setTeacherLoginData({
      ...teacherLoginData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault()
    const teacherFormData = new FormData();
    teacherFormData.append("email", teacherLoginData.email);
    teacherFormData.append("password", teacherLoginData.password);
    console.log(teacherFormData) // this didn't show any data in the console
    try {
      axios.post(baseUrl + "/teacher-login/", teacherFormData).then((res) => {
        if (res.data.bool === true) {
          localStorage.setItem("teacherLoginStatus", true);
          localStorage.setItem("teacherId", res.data.teacher_id);
          window.location.href = "/teacher-dashboard";
        } else {
          setErrorMsg("Invalid Email or Password!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus === "true") {
    window.location.href = "/teacher-dashboard";
  }

  useEffect(() => {
    document.title = "Teacher Login";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">Teacher Login</h5>
            <div className="card-body">
              {errorMsg && <p className="text-danger">{errorMsg}</p>}

              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  value={teacherLoginData.email}
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
                  value={teacherLoginData.password}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherLogin;
