import { Link } from "react-router-dom";
import SideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

function MyCourses() {
  const [courseData, setCourseData] = useState([]);
  const studentId = localStorage.getItem("studentId");
  useEffect(() => {
    try {
      axios.get(baseUrl + "/fetch-enrolled-courses/" + studentId + "/").then((res) => {
        console.log(res)
        setCourseData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    document.title = "My Courses";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <SideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">My courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Course name</th>
                    <th>Instructor </th>
                  </tr>
                </thead>
                <tbody>
                  {courseData.map((row, index) => (
                    <tr>
                      <td>
                        <Link to={`/detail/` + row.course.id}>
                          {row.course.title}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/teacher-detail/` + row.course.teacher.id}>
                          {row.course.teacher.full_name}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyCourses;
