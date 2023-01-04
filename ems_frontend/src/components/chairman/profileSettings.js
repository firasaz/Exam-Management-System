// import { Link, useParams } from "react-router-dom";
import ChairSideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function ChairProfileSettings() {
  const [chairData, setChairData] = useState({
    full_name: "",
    email: "",
    qualification: "",
    department: "",
    profile_img: "",
    p_img: "",
    status: "",
  });

  const chairId = localStorage.getItem("chairId");

  useEffect(() => {
    try {
      axios.get(baseUrl + "/chairman/" + chairId).then((res) => {
        setChairData({
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
    setChairData({
      ...chairData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setChairData({
      ...chairData,
      [event.target.name]: event.target.files[0],
    });
  };

  const submitForm = () => {
    const chairFormData = new FormData();
    chairFormData.append("full_name", chairData.full_name);
    chairFormData.append("email", chairData.email);
    chairFormData.append("qualification", chairData.qualification);
    chairFormData.append("department", chairData.department);
    if (chairData.p_img !== "") {
      chairFormData.append(
        "profile_img",
        chairData.p_img,
        chairData.p_img.name
      );
    }

    try {
      axios
        .put(baseUrl + "/chairman/" + chairId + "/", chairFormData, {
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
      setChairData({ status: "error" });
    }
  };

  const chairLoginStatus = localStorage.getItem("chairLoginStatus");
  if (chairLoginStatus !== "true") {
    window.location.href = "/chair-login";
  }

  useEffect(() => {
    document.title = "Chairman profile ";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <ChairSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Profile Settings</h5>
            <div className="card-body">
              <div className="mb-3">
                <label for="staticEmail" className="col-sm-2 col-form-label">
                  Full Name
                </label>
                <div className="col-sm-10">
                  <input
                    value={chairData.full_name}
                    onChange={handleChange}
                    name="full_name"
                    type="text"
                    className="form-control"
                    id="staticEmail"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label for="staticEmail" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    id="staticEmail"
                    value={chairData.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
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
                {chairData.profile_img && (
                  <p className="mt-2">
                    <img
                      src={chairData.profile_img}
                      width="300"
                      alt={chairData.full_name}
                    />
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label for="staticEmail" className="col-sm-2 col-form-label">
                  Qualification
                </label>
                <div className="col-sm-10">
                  <textarea
                    value={chairData.qualification}
                    onChange={handleChange}
                    name="qualification"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label for="staticEmail" className="col-sm-2 col-form-label">
                  Department
                </label>
                <div className="col-sm-10">
                  <input
                    value={chairData.department}
                    onChange={handleChange}
                    name="department"
                    type="text"
                    className="form-control"
                  />
                </div>
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

export default ChairProfileSettings;
