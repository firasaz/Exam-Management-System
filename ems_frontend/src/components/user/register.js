// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api/student/";

function Register() {
  useEffect(() => {
    document.title = "Student Register";
  });

  const [studentData, setStudentData] = useState({
    full_name: "",
    email: "",
    username: "",
    password: "",
    status: "",
  });

  //change element value
  const handleChange = (event) => {
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };

  //submit form
  function submitForm() {
    const studentFormData = new FormData();
    studentFormData.append("full_name", studentData.full_name);
    studentFormData.append("email", studentData.email);
    studentFormData.append("username", studentData.username);
    studentFormData.append("password", studentData.password);

    try {
      axios.post(baseUrl, studentFormData).then((response) => {
        setStudentData({
          full_name: "",
          email: "",
          username: "",
          password: "",
          status: "success",
        });
      });
    } catch (error) {
      console.log(error);
      setStudentData({ status: "error" });
    }
  }

  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus === "true") {
    window.location.href = "/student-dashboard";
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          {studentData.status === "success" && (
            <p className="text-success">Thanks for registration</p>
          )}
          {studentData.status === "error" && (
            <p className="text-danger">Something wrong happened</p>
          )}

          <div className="card">
            <h5 className="card-header">Student Register</h5>
            <div className="card-body">
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Full Name
                </label>
                <input
                  value={studentData.full_name}
                  type="text"
                  onChange={handleChange}
                  name="full_name"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  value={studentData.email}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Username
                </label>
                <input
                  value={studentData.username}
                  type="text"
                  name="username"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  value={studentData.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <button
                type="submit"
                onClick={submitForm}
                className="btn btn-primary"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
