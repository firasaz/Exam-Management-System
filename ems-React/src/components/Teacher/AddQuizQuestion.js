import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";
function AddQuizQuestion() {
  const [cats, setCats] = useState([]);
  const [questionData, setquestionData] = useState({
    question: "",
    type:"MCQ",
  });

  const handleChange = (event) => {
    setquestionData({
      ...questionData,
      [event.target.name]: event.target.value,
    });
    if(event.target.name === "type") {
      console.log(event.target)
    }
  };

  const { quiz_id } = useParams();

  const formSubmit = () => {
    const _formData = new FormData();
    _formData.append("exam", quiz_id);
    _formData.append("question", questionData.question);
    _formData.append("type", questionData.type);

    console.log(quiz_id)
    console.log(typeof(quiz_id))
    try {
    console.log(questionData)
    axios.post(`${baseUrl}/add-question/`, {
          exam: quiz_id,
          question: questionData.question,
          points: questionData.points,
          type: questionData.type,
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.status == 200 || res.status === 201) {
            Swal.fire({
              title: "Data has been added",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            // window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
    console.log(_formData)
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <div className="col-9">
          <div className="card">
            <h5 className="card-header">
              Add Question{" "}
              <Link
                className="btn btn-success btn-sm float-end"
                to={`/all-questions/${quiz_id}`}
              >
                All Questions
              </Link>
            </h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="question" className="form-label">
                    Question
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="question"
                    id="question"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="points" className="form-label">
                    Question Points
                  </label>
                  <input
                    type="number"
                    onChange={handleChange}
                    name="points"
                    id="points"
                    className="form-control"
                  />
                </div>

                {/* <div className="mb-3">
                  <label for="title" className="form-label">
                    Exam
                  </label>
                  <select
                    name="exam"
                    onClick={handleChange}
                    class="form-control"
                  >
                    {cats.map((exam, index) => {
                      return (
                        <option key={index} value={exam?.id}>
                          {exam?.name}
                        </option>
                      );
                    })}
                  </select>
                </div> */}

                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Type
                  </label>
                  <select
                    onClick={handleChange}
                    name="type"
                    id="type"
                    className="form-control"
                  >
                  <option key='choice 1' value='MCQ'>Multiple Choice</option>
                  <option key='choice 2' value='Classical Question' name="Classical Question" onClick={handleChange}>Classical Question</option>
                  </select>
                </div>
                {console.log("")}
                <div className="mb-3" id="choices">
                  <label htmlFor="title" className="form-label">
                    Ans 1
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="ans1"
                    id="title"
                    className="form-control mb-3"
                  />

                  <label htmlFor="title" className="form-label">
                    Ans 2
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="ans2"
                    id="title"
                    className="form-control mb-3"
                  />

                  <label htmlFor="title" className="form-label">
                    Ans 3
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="ans3"
                    id="title"
                    className="form-control mb-3"
                  />

                  <label htmlFor="title" className="form-label">
                    Ans 4
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="ans4"
                    id="title"
                    className="form-control mb-3"
                  />
                </div>

                {/* <div className="mb-3">
                  <label for="title" className="form-label">
                    Right Answer
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="right_ans"
                    id="title"
                    className="form-control"
                  />
                </div> */}

                <button
                  type="button"
                  onClick={formSubmit}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuizQuestion;
