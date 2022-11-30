// import { Link, useParams } from "react-router-dom";
import TeacherSideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function TeacherChangePasswords() {
  const teacherId = localStorage.getItem("teacherId");
  const [teacherData, setTeacherData] = useState({
    password: "",
  });

  useEffect(() => {
    document.title = "Change Password";
  });

  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = () => {
    const teacherFormData = new FormData();
    teacherFormData.append("password", teacherData.password);

    try {
      axios
        .post(
          baseUrl + "/teacher/change-password/" + teacherId,
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
      setTeacherData({ status: "error" });
    }
  };

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus !== "true") {
    window.location.href = "/teacher-login";
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">ChangePasswords</h5>
            <div className="card-body">
              <div className="mb-3 row">
                <label for="password" className="col-sm-2 col-form-label">
                  New Password
                </label>
                <div className="col-sm-10">
                  <input
                    value={teacherData.password}
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

export default TeacherChangePasswords;
