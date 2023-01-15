import { useParams, Link } from "react-router-dom";
import ChairSideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function CourseExams() {
  const [examData, setExamData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const { course_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + "/course-exams/" + course_id).then((res) => {
        setTotalResult(res.data.length);
        setExamData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const Swal = require("sweetalert2");
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
              axios.get(baseUrl + "/course-exams/" + course_id).then((res) => {
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
    document.title = "All Exams";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <ChairSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">
              All Exams ({totalResult})
              <Link
                className="btn btn-success btn-sm float-end"
                to={"/add-exam/" + course_id}
              >
                Add Exam
              </Link>
            </h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Course name</th>
                    <th>Description</th>
                    <th>Image </th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {examData.map((exam, index) => (
                    <tr>
                      <td>
                        <Link to={"/edit-exam/" + exam.id}>{exam.title}</Link>
                      </td>
                      <td>{exam.description}</td>
                      <td>
                        <img
                          src={exam.featured_img}
                          width="80"
                          className="rounded"
                          alt={exam.title}
                        ></img>
                      </td>
                      <td>{exam.remarks}</td>
                      <td>
                        <Link
                          to={"/edit-exam/" + exam.id}
                          className="btn btn-sm btn-info text-white"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                        <button
                          onClick={() => handleDelete(exam.id)}
                          className="btn btn-sm btn-danger ms-1"
                        >
                          <i className="bi bi-trash"></i>
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

export default CourseExams;
