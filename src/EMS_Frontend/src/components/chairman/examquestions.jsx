import { useParams, Link } from "react-router-dom";
import ChairSideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function ExamQuestions() {
  const [questionData, setQuestionData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const { exam_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + "/exam-questions/" + exam_id).then((res) => {
        setTotalResult(res.data.length);
        setQuestionData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const Swal = require("sweetalert2");
  function handleDelete(question_id) {
    Swal.fire({
      title: "Confirm",
      text: "Are you sure you want to delete?",
      icon: "info",
      confirmButtonText: "Continue",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + "/question/" + question_id).then((res) => {
            Swal.fire("success", "Data has been deleted");
            try {
              axios.get(baseUrl + "/exam-questions/" + exam_id).then((res) => {
                setTotalResult(res.data.length);
                setQuestionData(res.data);
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
    document.title = "Add exam Questions";
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
              All Questions ({totalResult})
              <Link
                className="btn btn-success btn-sm float-end"
                to={`/add-exam-question/` + exam_id}
              >
                Add Question
              </Link>
            </h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {questionData.map((row, index) => (
                    <tr>
                      <td>
                        <Link to={`/edit-question/` + row.id}>
                          {row.questions}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/edit-question/` + row.id}
                          className="btn btn-sm btn-info text-white"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                        <button
                          onClick={() => handleDelete(row.id)}
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

export default ExamQuestions;
