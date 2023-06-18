import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/account";


function StudentLogout(){
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('studentLoginStatus');
        axios.get(`${baseUrl}/logout/`);
        navigate('/login', { replace: true });
    }, []);
    return (
        <div></div>
    );
}
export default StudentLogout;