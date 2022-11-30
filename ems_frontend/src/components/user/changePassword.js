// import { Link, useParams } from "react-router-dom";
import TeacherSideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function ChangePasswords() {
  const studentId = localStorage.getItem("studentId");
  const [studentData, setStudentData] = useState({
    password: "",
  });

  useEffect(() => {
    document.title = "Change Password";
  });

  const handleChange = (event) => {
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = () => {
    const teacherFormData = new FormData();
    teacherFormData.append("password", studentData.password);

    try {
      axios
        .post(
          baseUrl + "/student/change-password/" + studentId,
          teacherFormData
        )
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              title: "Data has been updated",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        });
    } catch (error) {
      console.log(error);
      setStudentData({ status: "error" });
    }
  };

  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus !== "true") {
    window.location.href = "/student-login";
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">ChangePassword</h5>
            <div className="card-body">
              <div className="mb-3 row">
                <label for="password" className="col-sm-2 col-form-label">
                  New Password
                </label>
                <div className="col-sm-10">
                  <input
                    value={studentData.password}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="password"
                    name="password"
                  />
                </div>
              </div>
              {/* <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  Re-enter New Password
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                  />
                </div>
              </div> */}
              <hr />
              <button className="btn btn-primary" onClick={submitForm}>
                Update
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ChangePasswords;
