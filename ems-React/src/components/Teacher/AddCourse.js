import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";
function AddCourse() {
  const [cats, setCats] = useState([]);
  const [courseData, setCourseData] = useState({
    category: "",
    title: "",
    description: "",
    f_img: "",
    prerequisites: "",
  });

  // Fetch categories when page load
  // useEffect(() => {
  //   try {
  //     axios.get(baseUrl + "/category").then((res) => {
  //       setCats(res.data);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  const handleChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.files[0],
    });
  };

  function formSubmit(e) {
    e.preventDefault();

    try {
      console.log(courseData);
      axios.post(`${baseUrl}/course/`, {
            category: courseData.category,
            teacher: courseData.teacher,
            title: courseData.title,
            description: courseData.description,
            prerequisites: courseData.prerequisites,
            f_img: courseData.f_img
            // category: 2,
            // teacher: "2",
            // title: "hard-coded title for testing",
            // description: "testing type of data that works in POST request",
            // prerequisites: null,
            // f_img: null
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Course has been added",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
          window.location.href = "/add-course";
          // console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    try {
      axios.get(baseUrl + "/category/").then((res) => {
        console.log(res.data[0]);
        const teacherId = localStorage.getItem("teacherId");
        setCats(res.data);
        setCourseData({
          ...courseData,
          ["category"]: res.data[0].id, // this always sets the category to be the first element which is 'CMPE' in this case
          ["teacher"]: teacherId,
        });
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
            <h5 className="card-header">Add Course</h5>
            <h5 className="card-header">{courseData.teacher}: {typeof(courseData.teacher)}</h5>
            <h5 className="card-header">{courseData.category}: {typeof(courseData.category)}</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="title" className="form-label">
                    Category
                  </label>
                  <select
                    name="category"
                    onClick={handleChange}
                    class="form-control"
                  >
                    {cats.map((category, index) => {
                      return (
                        <option key={index} value={category?.id}>
                          {category?.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
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
                  <textarea
                    onChange={handleChange}
                    name="description"
                    className="form-control"
                    id="description"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label for="image" className="form-label">
                    Featured Image
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    name="f_img"
                    id="video"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="prerequisites" className="form-label">
                    Prerequisites
                  </label>
                  <textarea
                    onChange={handleChange}
                    className="form-control"
                    id="prerequisites"
                    name="prerequisites"
                  ></textarea>
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

export default AddCourse;