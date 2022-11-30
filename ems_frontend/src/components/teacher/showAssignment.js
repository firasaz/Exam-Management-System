import { useParams, Link } from "react-router-dom";
import TeacherSideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function ShowAssignment() {
  const [assignmentData, setAssignmentData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const { student_id } = useParams();
  const { teacher_id } = useParams();

  useEffect(() => {
    try {
      axios
        .get(baseUrl + "/student-assignment/" + teacher_id + "/" + student_id)
        .then((res) => {
          setTotalResult(res.data.length);
          setAssignmentData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    document.title = "All Assignments";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">
              All Assignments ({totalResult})
              <Link
                className="btn btn-success btn-sm float-end"
                to={`/add-assignment/${student_id}/${teacher_id}`}
              >
                Add Assignment
              </Link>
            </h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Assignment status</th>
                  </tr>
                </thead>
                <tbody>
                  {assignmentData.map((row, index) => (
                    <tr>
                      <td>{row.title}</td>
                      <td>
                        {row.student_status === false && (
                          <span className="badge bg-warning">Incomplete</span>
                        )}
                        {row.student_status === true && (
                          <span className="badge bg-success">Completed</span>
                        )}
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

export default ShowAssignment;
