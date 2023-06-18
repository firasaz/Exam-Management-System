// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/chairman/";

function ChairRegister() {
  useEffect(() => {
    document.title = "Chairman Register";
  });

  const [chairData, setChairmanData] = useState({
    full_name: "",
    email: "",
    password: "",
    qualification: "",
    department: "",
    status: "",
  });
  //change element value
  const handleChange = (event) => {
    setChairmanData({
      ...chairData,
      [event.target.name]: event.target.value,
    });
  };

  //submit form
  function submitForm() {
    const chairFormData = new FormData();
    chairFormData.append("full_name", chairData.full_name);
    chairFormData.append("email", chairData.email);
    chairFormData.append("password", chairData.password);
    chairFormData.append("qualification", chairData.qualification);
    chairFormData.append("department", chairData.department);

    try {
      axios.post(baseUrl, chairFormData).then((response) => {
        setChairmanData({
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
      setChairmanData({ status: "error" });
    }
  }

  const chairLoginStatus = localStorage.getItem("chairLoginStatus");
  if (chairLoginStatus === "true") {
    window.location.href = "/chair-dashboard";
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          {chairData.status === "success" && (
            <p className="text-success">Thanks for registration</p>
          )}
          {chairData.status === "error" && (
            <p className="text-danger">Something wrong happened</p>
          )}

          <div className="card">
            <h5 className="card-header">Chairman Register</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Full Name
                  </label>
                  <input
                    value={chairData.full_name}
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
                    value={chairData.email}
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
                    value={chairData.password}
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
                    value={chairData.qualification}
                    onChange={handleChange}
                    name="qualification"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Department
                  </label>
                  <input
                    value={chairData.department}
                    onChange={handleChange}
                    name="department"
                    type="text"
                    className="form-control"
                  />
                </div>
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

export default ChairRegister;
