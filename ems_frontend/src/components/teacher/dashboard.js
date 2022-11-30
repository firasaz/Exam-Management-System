import { Link, useParams } from "react-router-dom";
import TeacherSideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
// import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function TeacherDashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  });

  const [dashboardData, setdashboardData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    try {
      axios.get(baseUrl + "/teacher/dashboard/" + teacherId).then((res) => {
        console.log(res);
        setdashboardData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="row">
            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card header bg-primary text-white">
                  Total Courses
                </h5>
                <div className="card-body">
                  <h3>
                    <Link to="/teacher-courses">
                      {dashboardData.total_teacher_courses}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card header bg-success text-white">
                  Total Students
                </h5>
                <div className="card-body">
                  <h3>
                    <Link to="/teacher-users">
                      {dashboardData.total_teacher_students}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card header bg-danger text-white">
                  Total Exams
                </h5>
                <div className="card-body">
                  <h3>
                    <Link to="/teacher-courses">
                      {dashboardData.total_teacher_exams}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherDashboard;
