// import { Link, useParams } from "react-router-dom";
import TeacherSideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function TeacherProfileSettings() {
  const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    qualification: "",
    department: "",
    profile_img: "",
    p_img: "",
    status: "",
  });

  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    try {
      axios.get(baseUrl + "/teacher/" + teacherId).then((res) => {
        setTeacherData({
          full_name: res.data.full_name,
          email: res.data.email,
          qualification: res.data.qualification,
          department: res.data.department,
          profile_img: res.data.profile_img,
          p_img: "",
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.files[0],
    });
  };

  const submitForm = () => {
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("qualification", teacherData.qualification);
    teacherFormData.append("department", teacherData.department);
    if (teacherData.p_img !== "") {
      teacherFormData.append(
        "profile_img",
        teacherData.p_img,
        teacherData.p_img.name
      );
    }

    try {
      axios
        .put(baseUrl + "/teacher/" + teacherId + "/", teacherFormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
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

  useEffect(() => {
    document.title = "Teacher profile ";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Profile Settings</h5>
            <div className="card-body">
              <div className="mb-3">
                <label for="staticEmail" className="col-sm-2 col-form-label">
                  Full Name
                </label>

                <input
                  value={teacherData.full_name}
                  onChange={handleChange}
                  name="full_name"
                  type="text"
                  className="form-control"
                  id="staticEmail"
                />
              </div>
              <div className="mb-3">
                <label for="staticEmail" className="col-sm-2 col-form-label">
                  Email
                </label>

                <input
                  id="staticEmail"
                  value={teacherData.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  className="form-control"
                />
              </div>
              <div className="mb-3 row">
                <label for="image" className="col-sm-2 col-form-label ">
                  Profile Image
                </label>
                <input
                  name="p_img"
                  id="image"
                  onChange={handleFileChange}
                  type="file"
                  className="form-control"
                />
                {teacherData.profile_img && (
                  <p className="mt-2">
                    <img
                      src={teacherData.profile_img}
                      width="300"
                      alt={teacherData.full_name}
                    />
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label for="staticEmail" className="col-sm-2 col-form-label">
                  Qualification
                </label>

                <textarea
                  value={teacherData.qualification}
                  onChange={handleChange}
                  name="qualification"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="staticEmail" className="col-sm-2 col-form-label">
                  Department
                </label>

                <input
                  value={teacherData.department}
                  onChange={handleChange}
                  name="department"
                  type="text"
                  className="form-control"
                />
              </div>
              <hr />
              <button
                onClick={submitForm}
                type="submit"
                className="btn btn-primary"
              >
                Update
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherProfileSettings;
