import { Link, useParams } from "react-router-dom";
import ChairSideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

function MyStudents() {
  const [studentData, setStudentData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    try {
      axios
        .get(baseUrl + "/fetch-all-enrolled-students/" + teacherId)
        .then((res) => {
          setStudentData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    document.title = "All Students";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <ChairSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">All Students List</h5>
            <div className="card-body">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Assignment</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((row, index) => (
                    <tr>
                      <td>{row.student.full_name}</td>
                      <td>{row.student.email}</td>
                      <td>{row.student.username}</td>
                      <td>
                        <Link
                          to={`/show-assignment/${row.student.id}/${teacherId}`}
                          className="btn btn-sm btn-warning"
                        >
                          Assignments
                        </Link>
                        <Link
                          to={`/add-assignment/${row.student.id}/${teacherId}`}
                          className="btn btn-sm btn-success ms-2"
                        >
                          Add Assignment
                        </Link>
                      </td>
                      {/* <td>
                        <Link
                          className="btn btn-info btn-sm"
                          to={`/view-student/` + row.student.id}
                        >
                          View
                        </Link>
                      </td> */}
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

export default MyStudents;
