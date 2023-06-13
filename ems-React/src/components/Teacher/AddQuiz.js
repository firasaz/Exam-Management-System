import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";
function AddQuiz() {
  const teacherName = localStorage.getItem("teacherName");
  const [cats, setCats] = useState([]);
  const [teach, setTeach] = useState([]);
  const [quizData, setquizData] = useState({
    title: "",
    description: "",
    number_of_questions: "",
    duration: "",
    course: ""
  });

  const handleChange = (event) => {
    setquizData({
      ...quizData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = () => {
    const teacherId = localStorage.getItem("teacherId");
    const _formData = new FormData();
    _formData.append("teacher", teacherId);
    _formData.append("name", quizData.title);
    _formData.append("description", quizData.description);
    _formData.append("number_of_questions", quizData.number_of_questions);
    _formData.append("duration", quizData.duration);
    _formData.append("course", quizData.course);

    try {
      axios.post(`${baseUrl}/add-exam/`, _formData, {}).then((res) => {
        if (res.status === 200 || res.status ===201) {
          Swal.fire({
            title: "Exam has been created",
            icon: "success",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        } else {
          console.log(res.status);
          console.log(res.status.error);
        }
        // window.location.href = "/add-quiz";
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const teacherId = localStorage.getItem("teacherId");
      axios.get(`${baseUrl}/teacher-courses/${teacherId}/`).then((res) => {
        setCats(res.data);
        setquizData({
          ...quizData,
          ['course']: res.data[0].id,
        })
        
      });
    } catch (error) {
      console.log(error);
    }
    
    try {
      const teacherId = localStorage.getItem("teacherId");
      axios.get(`${baseUrl}/teacher/`).then((res) => {
        setTeach(res.data);
        
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
            <h5 className="card-header">Add Exam</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="title"
                    id="title"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="description"
                    id="description"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="no_questions" className="form-label">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    onChange={handleChange}
                    name="number_of_questions"
                    id="number_of_questions"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="duration" className="form-label">
                    Duration
                  </label>
                  <input
                    type="number"
                    onChange={handleChange}
                    name="duration"
                    id="duration"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="course" className="form-label">
                    Course
                  </label>
                  <select
                    name="course"
                    // value={courseData.category}
                    onChange={handleChange}
                    className="form-control"
                  >
                    {cats.map((course, index) => {
                      return (
                        <option key={index} value={course?.id}>
                          {course?.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="teacher" className="form-label">
                    Teacher
                  </label>
                  <input className="form-control" type="text" value={teacherName} readOnly />
                </div>

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

export default AddQuiz;
