import { Link } from "react-router-dom";
import ChairSideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function AllExams() {
  const [examData, setExamData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");
  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    try {
      axios.get(baseUrl + "/teacher-exam/" + teacherId).then((res) => {
        setExamData(res.data);
        setTotalResult(res.data.length);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  function handleDelete(exam_id) {
    Swal.fire({
      title: "Confirm",
      text: "Are you sure you want to delete?",
      icon: "info",
      confirmButtonText: "Continue",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + "/exam/" + exam_id).then((res) => {
            Swal.fire("success", "Data has been deleted");
            try {
              axios.get(baseUrl + "/teacher-exam/" + teacherId).then((res) => {
                setTotalResult(res.data.length);
                setExamData(res.data);
              });
            } catch (error) {
              console.log(error);
            }
          });
        } catch (error) {
          Swal.fire("error", "Data has not been deleted!!");
        }
      } else {
        Swal.fire("error", "Data has not been deleted!");
      }
    });
  }

  useEffect(() => {
    document.title = "Teacher exams";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <ChairSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">All Exams ({totalResult})</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Total Questions </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {examData.map((row, index) => (
                    <tr>
                      <td>
                        <Link to={`/all-questions/` + row.id}>{row.title}</Link>
                      </td>
                      <td>
                        <Link to="#">20</Link>
                      </td>
                      <td>
                        <Link
                          className="btn btn-info btn-sm"
                          to={`/edit-exam/` + row.id}
                        >
                          Edit
                        </Link>
                        <Link
                          className="btn btn-success btn-sm ms-2"
                          to={`/add-exam-question/` + row.id}
                        >
                          Add Question
                        </Link>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="btn btn-danger btn-sm ms-2"
                        >
                          Delete
                        </button>
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

export default AllExams;
