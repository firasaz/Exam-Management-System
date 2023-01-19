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
    exam: "",
    question: "",
    // exam: "",
    type:"MCQ"
  });

  const handleChange = (event) => {
    setquestionData({
      ...questionData,
      [event.target.name]: event.target.value,
      
    });
    if(event.target.name === "type") {
      console.log(event.target.value)
    }
  };

  const { quiz_id } = useParams();

  const formSubmit = () => {
    const _formData = new FormData();
    _formData.append("exam", quiz_id);
    _formData.append("question", questionData.question);
    // _formData.append("exam", questionData.exam);
    _formData.append("type", questionData.type);

    console.log(quiz_id)
    console.log(typeof(quiz_id))
    try {
    console.log(questionData)
    axios
        .post(`${baseUrl}/add-question/`, {
          exam: quiz_id,
          question: questionData.question,
          type: questionData.type
        }, {
          headers: {
            "content-type": "application/json",
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

  useEffect(() => {
    try {
      axios.get(`${baseUrl}/exams/`).then((res) => {
        console.log(res.data);
        setCats(res.data);
        setquestionData({
          ...questionData,
          // ['type']: res.data[0].id,
          ['exam']: quiz_id
        })
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
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
                  <label for="question" className="form-label">
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
                  <label for="title" className="form-label">
                    Type
                  </label>
                  <select
                    onClick={handleChange}
                    name="type"
                    id="type"
                    className="form-control"
                  >
                  <option key='choice 1' value='MCQ'>Multiple Choice</option>
                  <option key='choice 2' value='Classical Question'>Classical Question</option>
                  </select>
                </div>
                
                {/* <div className="mb-3">
                  <label for="title" className="form-label">
                    Ans 3
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="ans3"
                    id="title"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="title" className="form-label">
                    Ans 4
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="ans4"
                    id="title"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
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
