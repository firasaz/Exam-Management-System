import { Link, useParams } from "react-router-dom";
import SideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckExamStatusforStd from "./CheckExamStatusforstudent";
const baseUrl = "http://127.0.0.1:8000/api";

function CourseExamList() {
  const [examData, setExamData] = useState([]);
  const { course_id } = useParams();
  const studentId = localStorage.getItem("studentId");
  useEffect(() => {
    try {
      axios.get(`${baseUrl}/fetch-assigned-exam/${course_id}/`).then((res) => {
        setExamData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    document.title = "Exam List";
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <SideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Exam List</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Exam</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {examData.map((row, index) => (
                    <tr>
                      <td>{row.exam.title}</td>
                      <CheckExamStatusforStd
                        exam={row.exam.id}
                        student={studentId}
                      ></CheckExamStatusforStd>
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

export default CourseExamList;
