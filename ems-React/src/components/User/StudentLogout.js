import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/account";


function StudentLogout(){
    localStorage.removeItem('studentLoginStatus');
    axios.get(`${baseUrl}/logout/`);
    window.location.href='/login';
    return (
        <div></div>
    );
}
export default StudentLogout;