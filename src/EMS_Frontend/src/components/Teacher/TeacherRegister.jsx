import { useEffect, useState } from "react";

import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api/teacher/";
function TeacherRegister() {
  const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    password: "",
    qualification: "",
    department: "",
    status: "",
  });
  // Change Element value
  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };
  // End

  // Submit Form
  const submitForm = () => {
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("password", teacherData.password);
    teacherFormData.append("qualification", teacherData.qualification);
    teacherFormData.append("department", teacherData.department);

    try {
      axios.post(baseUrl, teacherFormData).then((response) => {
        console.log(response);
        setTeacherData({
          full_name: "",
          email: "",
          password: "",
          qualification: "",
          department: "",
          status: "success",
        });
      });
    } catch (error) {
      console.log(error);
      setTeacherData({ status: "error" });
    }
  };
  // End

  useEffect(() => {
    document.title = "Teacher Register";
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          {teacherData.status === "success" && (
            <p className="text-success">Thanks for registration</p>
          )}
          {teacherData.status === "error" && (
            <p className="text-danger">Something wrong happened</p>
          )}

          <div className="card">
            <h5 className="card-header">Teacher Register</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Full Name
                  </label>
                  <input
                    value={teacherData.full_name}
                    onChange={handleChange}
                    name="full_name"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    value={teacherData.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    value={teacherData.password}
                    onChange={handleChange}
                    name="password"
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Qualification
                  </label>
                  <input
                    value={teacherData.qualification}
                    onChange={handleChange}
                    name="qualification"
                    type="text"
                    className="form-control"
                  />
                </div>
                {/* <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Department
                  </label>
                  <input
                    value={teacherData.department}
                    onChange={handleChange}
                    name="department"
                    type="text"
                    className="form-control"
                  />
                </div> */}
                <button
                  onClick={submitForm}
                  type="submit"
                  className="btn btn-primary"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherRegister;
