// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

function ChairLogin() {
  const [chairLoginData, setChairLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    setChairLoginData({
      ...chairLoginData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = () => {
    const ChairFormData = new FormData();
    ChairFormData.append("email", chairLoginData.email);
    ChairFormData.append("password", chairLoginData.password);
    try {
      axios.post(baseUrl + "/chair-login", ChairFormData).then((res) => {
        if (res.data.bool === true) {
          localStorage.setItem("chairLoginStatus", true);
          localStorage.setItem("chairId", res.data.chair_id);
          window.location.href = "/chair-dashboard";
        } else {
          setErrorMsg("Invalid Email or Password!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const chairLoginStatus = localStorage.getItem("chairLoginStatus");
  if (chairLoginStatus === "true") {
    window.location.href = "/chair-dashboard";
  }

  useEffect(() => {
    document.title = "Chairman Login";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">Chairman Login</h5>
            <div className="card-body">
              {errorMsg && <p className="text-danger">{errorMsg}</p>}

              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  value={chairLoginData.email}
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
                  value={chairLoginData.password}
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

export default ChairLogin;
