import { Link } from "react-router-dom";
import SideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

// function allStorage() {
//   var values = [],
//     keys = Object.keys(localStorage),
//     i = keys.length;
//   console.log(keys);

//   while (i--) {
//     values.push(localStorage.getItem(keys[i]));
//   }

//   return values;
// }
function StudentAssignments() {
  const [AssignmentData, setAssignmentData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const studentId = localStorage.getItem("studentId");
  // console.log(allStorage());
  console.log(studentId);

  useEffect(() => {
    try {
      axios.get(baseUrl + "/my-assignments/" + studentId).then((res) => {
        setAssignmentData(res.data);
        setTotalResult(res.data.length);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const markAsDone = (assignment_id, title, detail, student, teacher) => {
    const formData = new FormData();
    formData.append("student_status", true);
    formData.append("title", title);
    formData.append("detail", detail);
    formData.append("student", student);
    formData.append("teacher", teacher);

    try {
      axios
        .put(baseUrl + "/update-assignments/" + assignment_id, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "My Assignments";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <SideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">My Assignments ({totalResult})</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Detail</th>
                    <th>Instructor </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {AssignmentData.map((row, index) => (
                    <tr>
                      <td>{row.title}</td>
                      <td>{row.detail}</td>
                      <td>
                        <Link to={`/teacher-detail/` + row.teacher.id}>
                          {row.teacher.full_name}
                        </Link>
                      </td>
                      <td>
                        {row.student_status === false && (
                          <button
                            onClick={() =>
                              markAsDone(
                                row.id,
                                row.title,
                                row.detail,
                                row.student.id,
                                row.teacher.id
                              )
                            }
                            className="btn btn-success btn-sm"
                          >
                            Mark as done
                          </button>
                        )}
                        {row.student_status === true && (
                          <span className="badge bg-primary">Completed</span>
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

export default StudentAssignments;
