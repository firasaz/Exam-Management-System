import { useParams, Link } from "react-router-dom";
import TeacherSideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function EditExam() {
  const [cats, setCats] = useState([]);
  const [examData, setExamData] = useState({
    course: "",
    name: "",
    description: "",
    // f_img: "",
    number_of_questions: "",
    time: "",
    questions: ""
  });
  const handleChange = (event) => {
    setExamData({
      ...examData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setExamData({
      ...examData,
      [event.target.name]: event.target.files[0],
    });
  };

  const { exam_id } = useParams();

  const formSubmit = (event) => {
    event.preventDefault()
    // const _formData = new FormData();

    // _formData.append("course", examData.course);
    // _formData.append("title", examData.title);
    // _formData.append("description", examData.description);
    // _formData.append("featured_img", examData.f_img, examData.f_img.name);
    // _formData.append("remarks", examData.remarks);

    try {
      axios
        .put(baseUrl + "/exam/" + exam_id + "/", examData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Data has been updated",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
          //   window.location.href = "/add-exam/1";
        });
    } catch (error) {
      console.log(error);
    }
  };

  //fetch courses when page load

  useEffect(() => {
    try {
      axios.get(baseUrl + "/exam/" + exam_id + "/").then((res) => {
        console.log(res)
        setExamData({
          // course: res.data.course,
          name: res.data.name,
          description: res.data.description,
          // f_img: res.data.f_img,
          number_of_questions: res.data.number_of_questions,
          time: res.data.time,
          questions: res.data.questions
        });
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(baseUrl + "/question/").then((res) => {
        console.log(res)
        setCats(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    document.title = "Edit Exam";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <div className="col-9">
          <div className="card">
            <h5 className="card-header">Update Exam</h5>
            <div className="card-body">
              <form onSubmit={formSubmit}>
                <div className="mb-3 ">
                  <label for="title" className="form-label">
                    Exam Title
                  </label>
                  <input
                    value={examData.name}
                    type="text"
                    onChange={handleChange}
                    name="name"
                    id="name"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    value={examData.description}
                    onChange={handleChange}
                    className="form-control"
                    id="description"
                    name="description"
                  ></textarea>
                </div>
                {/* <div className="mb-3 row">
                  <label for="image" className="form-label">
                    Course Image
                  </label>

                  <input
                    value={examData.image}
                    name="f_img"
                    id="f_img"
                    onChange={handleFileChange}
                    type="file"
                    className="form-control"
                  />
                </div> */}
                <div className="mb-3">
                  <label for="number_of_questions" className="form-label">
                  Number of Questions
                  </label>
                  <textarea
                    value={examData.number_of_questions}
                    onChange={handleChange}
                    className="form-control"
                    id="number_of_questions"
                    name="number_of_questions"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label for="duration" className="form-label">
                  Exam Duration
                  </label>
                  <input
                  type={"number"}
                    value={examData.time}
                    onChange={handleChange}
                    className="form-control"
                    id="duration"
                    name="duration"
                  ></input>
                </div>

                <div className="mb-3 ">
                  <label for="questions" className="form-label">
                    Questions
                  </label>
                  <select
                    name="questions"
                    value={examData.questions}
                    className="form-control">
                    {cats.map((questions, index) => {
                      return (
                        <option key={index} value={questions.id}>
                          {questions.text}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <hr />
                <button
                  type="submit"
                  className="btn btn-primary">
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
export default EditExam;
