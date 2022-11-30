import { useParams } from "react-router-dom";
import TeacherSideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function EditCourse() {
  const [cats, setCats] = useState([]);
  const [courseData, setCourseData] = useState({
    category: "",
    title: "",
    description: "",
    prev_img: "",
    f_img: "",
    prerequisites: "",
  });

  const { course_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + "/category").then((res) => {
        setCats(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    //fetch current course data
    try {
      axios.get(baseUrl + "/teacher-course-detail/" + course_id).then((res) => {
        setCourseData({
          category: res.data.category,
          title: res.data.title,
          description: res.data.description,
          prev_img: res.data.featured_img,
          f_img: "",
          prerequisites: res.data.prerequisites,
        });
      });
    } catch (error) {
      console.log(error);
    }
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

  const formSubmit = () => {
    const _formData = new FormData();
    _formData.append("category", courseData.category);
    _formData.append("teacher", 1);
    _formData.append("title", courseData.title);
    _formData.append("description", courseData.description);
    if (courseData.f_img !== "") {
      _formData.append("featured_img", courseData.f_img, courseData.f_img.name);
    }
    _formData.append("prerequisites", courseData.prerequisites);

    try {
      axios
        .put(baseUrl + "/teacher-course-detail/" + course_id, _formData, {
          headers: {
            "content-type": "multipart/form-data",
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
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Edit Course";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <div className="col-9">
          <div className="card">
            <h5 className="card-header">Edit Course</h5>
            <div className="card-body">
              <form>
                <div className="mb-3 ">
                  <label for="category" className="form-label">
                    Category
                  </label>
                  <select
                    name="category"
                    value={courseData.category}
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
                    value={courseData.title}
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
                    value={courseData.description}
                    onChange={handleChange}
                    className="form-control"
                    id="description"
                    name="description"
                    // rows="3"
                  ></textarea>
                </div>
                <div className="mb-3 row">
                  <label for="image" className="form-label">
                    Course Image
                  </label>

                  <input
                    name="f_img"
                    id="image"
                    onChange={handleFileChange}
                    type="file"
                    className="form-control"
                  />
                  {courseData.prev_img && (
                    <p className="mt-2">
                      <img
                        src={courseData.prev_img}
                        width="300"
                        alt={courseData.title}
                      />
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label for="prerequisites" className="form-label">
                    Prerequisites
                  </label>
                  <textarea
                    value={courseData.prerequisites}
                    onChange={handleChange}
                    className="form-control"
                    id="prerequisites"
                    name="prerequisites"
                  ></textarea>
                </div>

                <hr />
                <button
                  type="submit"
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

export default EditCourse;
