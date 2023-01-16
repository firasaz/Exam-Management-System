import { Link, useParams } from "react-router-dom";
import TeacherSideBar from "./sidebar";
import CheckExaminCourse from "./CheckExaminCourse";
import { useEffect, useState } from "react";
import axios from "axios";
// import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function AssignExam() {
  const [examData, setExamData] = useState([]);
  const { course_id } = useParams();
  //   const { exam_id } = useParams();
  const [courseData, setCourseData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    document.title = "Assign exam";
    try {
      axios.get(baseUrl + "/teacher-exam/" + teacherId).then((res) => {
        setExamData(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(baseUrl + "/course/" + course_id).then((res) => {
        console.log(res);
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">
              Assign Exam{" "}
              <span className="text-primary">({courseData.title})</span>
            </h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {examData.map((row, index) => (
                    <tr>
                      <td>
                        <Link to={`/all-questions/` + row.id}>{row.title}</Link>
                      </td>
                      <CheckExaminCourse exam={row.id} course={course_id} />
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

export default AssignExam;
