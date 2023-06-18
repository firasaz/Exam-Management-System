import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    // this is used instead of "window.loaction.href" to make a client redirection and prevent a 404 error as the page is not inside the server
    const navigate = useNavigate();

    const [loginData, setloginData ] = useState({
        email: "",
        password: "",
        });
    const [errorMsg, seterrorMsg] = useState("");

    const handleChange = (event) => {
        setloginData({
        ...loginData, [event.target.name]: event.target.value
        });
    };

    const submitForm = (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("email", loginData.email);
        formData.append("password", loginData.password);
        try {
        axios.post(`http://127.0.0.1:8000/api/teacher-login/`, formData).then((res) => {
            if (res.data.bool === true) {
            if (res.data.position === true) {
                console.log(res.data.id);
                localStorage.setItem("teacherName", res.data.name);
                localStorage.setItem("teacherId", res.data.id);
                localStorage.setItem("teacherLoginStatus", true);
                navigate("/teacher-dashboard", { replace: true });
            } else {
                localStorage.setItem("studentName", res.data.name);
                localStorage.setItem("studentId", res.data.id);
                localStorage.setItem("studentLoginStatus", true);
                navigate("/user-dashboard", { replace: true });
            }
            }
            else {
            seterrorMsg("Email or password is incorrect!");
            setTimeout(() => {
                seterrorMsg("");
            }, 3000);
            }
        });
        } catch (error) {console.log(error)};
    };

    return (
        <div className="container mt-4">
        <div className="row">
            <div className="col-5 mx-auto">
            <div className="card">
                <h5 className="card-header">Login Page</h5>
                <div className="card-body">
                {errorMsg && <p className="text-danger">{errorMsg}</p>}
                <form className="login-form">
                    <div className="mb-3">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input name="email" type="email" value={loginData.email} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input name="password" type="password" value={loginData.password} onChange={handleChange} className="form-control" />
                    </div>
                    <button className="btn btn-primary mb-2" onClick={submitForm} type="submit">Login</button>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default Login;
