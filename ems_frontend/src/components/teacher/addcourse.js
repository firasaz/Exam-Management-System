// import { Link } from "react-router-dom";
import TeacherSideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

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

  function formSubmit() {
    console.log('orawri')
    const teacherId = localStorage.getItem("teacherId");
    const formData = new FormData();
    formData.append("category", courseData.category);
    formData.append("teacher", teacherId);
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("featured_img", courseData.f_img, courseData.f_img.name);
    formData.append("prerequisites", courseData.prerequisites);
    try {
      console.log("trying to post")
      console.log(formData)
      axios.post(baseUrl + "/course/", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          window.location.href = "/add-course";
          // console.log(res.data);
        });
    } catch (error) {
      console.log("error:")
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axios.get(baseUrl + "/category/").then((res) => {
        console.log(res)
        setCats(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);


  useEffect(() => {
    document.title = "Add Course";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <div className="col-9">
          <div className="card">
            <h5 className="card-header">Add Course</h5>
            <div className="card-body">
              <form>
                <div className="mb-3 ">
                  <label for="title" className="form-label">
                    Category
                  </label>
                  <select
                    name="category"
                    onChange={handleChange}
                    className="form-control"
                  >
                    {cats.map((category, index) => {
                      return (
                        <option key={index} value={category.id}>
                          {category.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3 ">
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
                    className="form-control"
                    id="description"
                    name="description"
                  ></textarea>
                </div>
                <div className="mb-3 row">
                  <label for="image" className="form-label">
                    Course Image
                  </label>

                  <input
                    name="f_img"
                    id="f_img"
                    onChange={handleFileChange}
                    type="file"
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

                <hr />
                <button
                  onClick={formSubmit}
                  type="submit"
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
