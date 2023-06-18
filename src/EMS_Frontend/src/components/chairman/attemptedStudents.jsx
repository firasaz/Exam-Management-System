import { useParams } from "react-router-dom";
import ChairSideBar from "./sidebar";
import ExamResult from "./examresult";
import { useEffect, useState } from "react";
import axios from "axios";
// import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function AttemptedStudents() {
  const [studentData, setStudentData] = useState([]);
  const { exam_id } = useParams();
  // const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    try {
      axios.get(baseUrl + "/attempted-exam/" + exam_id).then((res) => {
        setStudentData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    document.title = "Attempted exam";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <ChairSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Student List</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((row, index) => (
                    <tr>
                      <td>{row.student.full_name} </td>
                      <td>{row.student.email}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target={`#resultModal${row.id}`}
                        >
                          Exam Result
                        </button>
                        <div
                          className="modal fade"
                          id={`resultModal${row.id}`}
                          tabindex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalLongTitle"
                          aria-hidden="true"
                        >
                          <ExamResult
                            exam={row.exam.id}
                            student={row.student.id}
                          />
                        </div>
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

export default AttemptedStudents;
