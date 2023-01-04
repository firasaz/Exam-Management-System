import { Link, useParams } from "react-router-dom";
import TeacherSideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function AddQuestion() {
  //console.log("Add question");
  const { exam_id } = useParams();
  const teacherId = localStorage.getItem("teacherId");
  console.log(teacherId);

  const [questionData, setQuestionData] = useState({
    exam: exam_id,
    questions: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    right_ans: "",
  });

  // useEffect(() => {
  //   console.log(questionData);
  // }, []);

  const handleChange = (event) => {
    console.log(questionData);

    setQuestionData({
      ...questionData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(exam_id);
    const _formData = new FormData();
    _formData.append("exam", questionData.exam);
    _formData.append("questions", questionData.title);
    _formData.append("ans1", questionData.ans1);
    _formData.append("ans2", questionData.ans2);
    _formData.append("ans3", questionData.ans3);
    _formData.append("ans4", questionData.ans4);
    _formData.append("right_ans", questionData.right_ans);

    // console.log(questionData);

    try {
      axios
        .post(baseUrl + "/add-exam-question/" + exam_id, _formData)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "Data has been added",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Add Question";
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <div className="col-9">
          <div className="card">
            <h5 className="card-header">
              Add Question
              <Link
                className="btn btn-success btn-sm float-end"
                to={`/all-questions/` + exam_id}
              >
                All Questions
              </Link>
            </h5>
            <div className="card-body">
              <form onChange={handleChange}>
                <div className="mb-3 ">
                  <label for="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="questions"
                    id="title"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="title" className="form-label">
                    Answer 1
                  </label>
                  <input
                    type="text"
                    //onChange={handleChange}
                    className="form-control"
                    id="title"
                    name="ans1"
                  ></input>
                </div>
                <div className="mb-3">
                  <label for="title" className="form-label">
                    Answer 2
                  </label>
                  <input
                    type="text"
                    // onChange={handleChange}
                    className="form-control"
                    id="title"
                    name="ans2"
                  ></input>
                </div>
                <div className="mb-3">
                  <label for="title" className="form-label">
                    Answer 3
                  </label>
                  <input
                    type="text"
                    //onChange={handleChange}
                    className="form-control"
                    id="title"
                    name="ans3"
                  ></input>
                </div>
                <div className="mb-3">
                  <label for="title" className="form-label">
                    Answer 4
                  </label>
                  <input
                    type="text"
                    //onChange={handleChange}
                    className="form-control"
                    id="title"
                    name="ans4"
                  ></input>
                </div>
                <div className="mb-3">
                  <label for="title" className="form-label">
                    Correct Answer
                  </label>
                  <input
                    type="text"
                    //onChange={handleChange}
                    className="form-control"
                    id="title"
                    name="right_ans"
                  ></input>
                </div>

                <hr />
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

export default AddQuestion;
