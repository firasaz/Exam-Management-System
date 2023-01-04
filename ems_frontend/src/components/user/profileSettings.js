// import { Link, useParams } from "react-router-dom";
import SideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function ProfileSettings() {
  const [studentData, setStudentData] = useState({
    full_name: "",
    email: "",
    username: "",
    profile_img: "",
    p_img: "",
    // status: "",
  });

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    try {
      axios.get(baseUrl + "/student/" + studentId).then((res) => {
        setStudentData({
          full_name: res.data.full_name,
          email: res.data.email,
          username: res.data.username,
          profile_img: res.data.profile_img,
          p_img: "",
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (event) => {
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.files[0],
    });
  };

  const submitForm = () => {
    const studentFormData = new FormData();
    studentFormData.append("full_name", studentData.full_name);
    studentFormData.append("email", studentData.email);
    studentFormData.append("username", studentData.username);
    if (studentData.p_img !== "") {
      studentFormData.append(
        "profile_img",
        studentData.p_img,
        studentData.p_img.name
      );
    }

    try {
      axios
        .put(baseUrl + "/student/" + studentId + "/", studentFormData, {
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
      setStudentData({ status: "error" });
    }
  };

  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus !== "true") {
    window.location.href = "/student-login";
  }

  useEffect(() => {
    document.title = "Student profile ";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <SideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Profile Settings</h5>
            <div className="card-body">
              <div className="mb-3 row">
                <label for="staticEmail" className="col-sm-2 col-form-label">
                  Full Name
                </label>
                <div className="col-sm-10">
                  <input
                    value={studentData.full_name}
                    onChange={handleChange}
                    name="full_name"
                    type="text"
                    className="form-control"
                    id="staticEmail"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="staticEmail" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    id="staticEmail"
                    value={studentData.email}
                    onChange={handleChange}
                    type="email"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="staticEmail" className="col-sm-2 col-form-label">
                  Username
                </label>
                <div className="col-sm-10">
                  <input
                    value={studentData.username}
                    onChange={handleChange}
                    name="username"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="image" className="col-sm-2 col-form-label ">
                  Profile Image
                </label>
                <div className="col-sm-10">
                  <input
                    name="p_img"
                    id="image"
                    onChange={handleFileChange}
                    type="file"
                    className="form-control"
                  />
                </div>
                {studentData.profile_img && (
                  <p className="mt-2">
                    <img
                      src={studentData.profile_img}
                      width="300"
                      alt={studentData.full_name}
                    />
                  </p>
                )}
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

export default ProfileSettings;
