import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function AddQuiz() {
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
    _formData.append("teacher", quizData.teacher);
    _formData.append("title", quizData.title);
    _formData.append("detail", quizData.description);
    _formData.append("detail", quizData.number_of_questions);
    _formData.append("detail", quizData.duration);
    _formData.append("detail", quizData.course);

    try {
      axios.post(`${baseUrl}/add-exam/`, _formData, {}).then((res) => {
        // console.log(res.data);
        window.location.href = "/add-quiz";
      });
    } catch (error) {
      console.log(error);
    }
    
  console.log(_formData)
  };

  useEffect(() => {
    try {
      const teacherId = localStorage.getItem("teacherId");
      axios.get(`${baseUrl}/teacher-courses/${teacherId}/`).then((res) => {
        console.log(res.data);
        setCats(res.data);
        // setquizData({
        //   ...quizData,
        //   ['teacherId']: teacherId,
        // })
        
      });
    } catch (error) {
      console.log(error);
    }
    
    try {
      const teacherId = localStorage.getItem("teacherId");
      axios.get(`${baseUrl}/teacher/`).then((res) => {
        console.log(res.data);
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
                  <label for="title" className="form-label">
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
                  <label for="description" className="form-label">
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
                  <label for="no_questions" className="form-label">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    onChange={handleChange}
                    name="no_questions"
                    id="no_questions"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="duration" className="form-label">
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
                </div>
                <div className="mb-3">
                  <label for="teacher" className="form-label">
                    Teacher
                  </label>
                  <select
                    name="teacher"
                    // value={courseData.category}
                    onChange={handleChange}
                    class="form-control"
                  >
                    {teach.map((teacher, index) => {
                      return (
                        <option key={index} value={teacher?.id}>
                          {teacher?.full_name}
                        </option>
                      );
                    })}
                  </select>
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
