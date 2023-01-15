import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CheckquizStatusForStudent from "./CheckQuizStatusForStudent";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function CoursequizList() {
  const [quizData, setquizData] = useState([]);
  const studentId = localStorage.getItem("studentId");
  const { course_id } = useParams();
  // Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + "/fetch-assigned-quiz/" + course_id).then((res) => {
        setquizData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    document.title = "Exams List ";
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Exams List</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Exam</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {quizData.map((row, index) => (
                    <tr>
                      <td>{row.quiz.title}</td>
                      <CheckquizStatusForStudent
                        quiz={row.quiz.id}
                        student={studentId}
                      />
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

export default CoursequizList;
