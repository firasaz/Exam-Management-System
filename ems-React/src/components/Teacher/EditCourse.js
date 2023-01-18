// import {Link} from 'react-router-dom';
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";
function EditCourse() {
  const [prereq, setPrereq] = useState([]);
  const [cats, setCats] = useState([]);
  const [courseData, setCourseData] = useState({
    category: "",
    title: "",
    description: "",
    f_img: "",
    prerequisites: "",
    // prev_img: "",
    // techs:''
  });

  const { course_id } = useParams();


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

  const formSubmit = (e) => {
    e.preventDefault();
    // const _formData = new FormData();
    // _formData.append("category", courseData.category);
    // _formData.append("teacher", 1);
    // _formData.append("title", courseData.title);
    // _formData.append("description", courseData.description);
    // if (courseData.f_img !== "") {
    //   _formData.append("featured_img", courseData.f_img);
    // }
    // // _formData.append('techs',courseData.techs);

    try {
      const teacherId = localStorage.getItem("teacherId");
      console.log(courseData)
      axios.put(`${baseUrl }/teacher-course-edit/${course_id}/`, {
        // category: 2,
        // // teacher: "2",
        // title: "hard-coded title for testing",
        // description: "testing type of data that works in POST request",
        // prerequisites: null,
        // featured_img: null
        category: courseData.category,
        teacher: teacherId,
        title: courseData.title,
        description: courseData.description,
        prerequisites: courseData.prerequisites,
        featured_img: courseData.f_img
        // techs: courseData.techs
        }, {
          headers: {
            // "Content-Type": "multipart/form-data"
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.status === 200 || res.status ===201) {
            Swal.fire({
              title: "Data has been updated",
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
        });
    } catch (error) {
      console.log(error);
    }
    console.log(courseData);
    console.log(courseData.category);
  };

    // Fetch categories when page load for category menu
    useEffect(() => {
      // const teacherId = localStorage.getItem("teacherId");
      try {
        axios.get(`${baseUrl}/category/`).then((res) => {
          console.log(res.data)
          const teacherId = localStorage.getItem("teacherId");
          setCats(res.data);
          setCourseData({
            ...courseData,
            ["teacher"]: teacherId,
          })
        });
      } catch (error) {
        console.log(error);
      }

      // fetch courses for the prerequisites menu
      try {
        axios.get(`${baseUrl}/course/`).then((res) => {
          console.log(res.data);
          setPrereq(res.data)
        });
      } catch(error) {
        console.log(error);
      }
  
      // Fetch current course data
      try {
        axios.get(`${baseUrl}/teacher-course-edit/${course_id}/`).then((res) => {
          console.log(res.data)
          setCourseData({
            category: res.data.category,
            title: res.data.title,
            description: res.data.description,
            f_img: res.data.featured_img,
            prerequisites: res.data.prerequisites,
            // f_img: "",
            // techs:res.data.techs,
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
            <h5 className="card-header">Edit Course</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="category" className="form-label">
                    Category
                  </label>
                  <select
                    name="category"
                    value={courseData.category}
                    onChange={handleChange}
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
                    value={courseData.title}
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
                    value={courseData.description}
                    name="description"
                    className="form-control"
                    id="description"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label for="video" className="form-label">
                    Featured Image
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    name="f_img"
                    id="video"
                    className="form-control"
                  />
                  {courseData.f_img && (
                    <p className="mt-2">
                      <img
                        src={courseData.f_img}
                        width="300"
                        alt={courseData.title}
                      />
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label for="title" className="form-label">
                    Prerequisites
                  </label>
                  <select
                    name="prerequisites"
                    onClick={handleChange}
                    class="form-control"
                  >
                    {prereq.map((prerequisites, index) => {
                      return (
                        <option key={index} value={prerequisites?.id}>
                          {prerequisites?.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {/* <div className="mb-3">
                  <label for="prerequisites" className="form-label">
                    Prerequisites
                  </label>
                  <textarea
                    onChange={handleChange}
                    className="form-control"
                    id="prerequisites"
                    name="prerequisites"
                  ></textarea>
                </div> */}
                {/* <div className="mb-3">
                                    <label for="techs" className="form-label">Technologies</label>
                                    <textarea value={courseData.techs} onChange={handleChange} name='techs' className="form-control" placeholder="Php, Python, Javascript, HTML, CSS" id="techs"></textarea>
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

export default EditCourse;
