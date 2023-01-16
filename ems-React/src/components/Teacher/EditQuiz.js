// import {Link} from 'react-router-dom';
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";
function EditQuiz() {
  const [quizData, setquizData] = useState({
    name: "",
    description: "",
    no_of_questions: "",
    duration: "",
    // course: ""
  });

  const teacherId = localStorage.getItem("teacherId");
  const { exam_id } = useParams();

  const handleChange = (event) => {
    setquizData({
      ...quizData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = () => {
    const _formData = new FormData();
    _formData.append("teacher", teacherId);
    _formData.append("name", quizData.name);
    _formData.append("description", quizData.description);
    _formData.append("number_of_questions", quizData.no_of_questions);
    _formData.append("duration", quizData.duration);

    try {
      axios.put(`${baseUrl}/teacher-exam-detail-edit/${exam_id}/`, {
        teacher: teacherId,
        name: quizData.name,
        description: quizData.description,
        no_of_questions: quizData.no_of_questions,
        duration: quizData.duration,
        // course: quizData.course,
      }, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          console.log(res)
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
        });
    } catch (error) {
      console.log(error);
    }
    console.log(_formData)
    console.log(quizData)
  };

   // Fetch categories when page load
    useEffect(() => {
    // Fetch current quiz data
    try {
      axios.get(`${baseUrl}/teacher-exam-detail/${exam_id}/`).then((res) => {
        console.log(res.data)
        setquizData({
          name: res.data.name,
          description: res.data.description,
          no_of_questions: res.data.number_of_questions,
          duration: res.data.duration,
          // course: res.data.course
        });
      });
    } catch (error) {
      console.log(error);
    }
    // End
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <div className="col-9">
          <div className="card">
            <h5 className="card-header">Edit Exam</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    value={quizData.name}
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
                    onChange={handleChange}
                    value={quizData.description}
                    name="description"
                    className="form-control"
                    id="description"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label for="no_of_questions" className="form-label">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    value={quizData.no_of_questions}
                    onChange={handleChange}
                    name="no_of_questions"
                    id="no_of_questions"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="duration" className="form-label">
                    Duration
                  </label>
                  <input
                    type="number"
                    value={quizData.duration}
                    onChange={handleChange}
                    name="duration"
                    id="duration"
                    className="form-control"
                  />
                </div>
                {/* <div className="mb-3">
                  <label for="course" className="form-label">
                    Course
                  </label>
                  <select
                    name="course"
                    // value={courseData.category}
                    onChange={handleChange}
                    class="form-control"
                  >
                    {cats.map((course, index) => {
                      return (
                        <option key={index} value={course?.id}>
                          {course?.title}
                        </option>
                      );
                    })}
                  </select>
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

export default EditQuiz;
