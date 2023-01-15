// import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function CourseDetail() {
  const [courseData, setcourseData] = useState([]);
  const [chapterData, setchapterData] = useState([]);
  const [teacherData, setteacherData] = useState([]);

  const [userLoginStatus, setuserLoginStatus] = useState();
  const [enrollStatus, setenrollStatus] = useState();

  let { course_id } = useParams();
  const studentId = localStorage.getItem("studentId");
  // Fetch courses when page load
  useEffect(() => {
    // Fetch Courses
    try {
      axios.get(baseUrl + "/course/" + course_id).then((res) => {
        console.log(res);
        setcourseData(res.data);
        setchapterData(res.data.course_chapters);
        setteacherData(res.data.teacher);
      });
    } catch (error) {
      console.log(error);
    }

    // Fetch enroll status
    try {
      axios
        .get(baseUrl + "/fetch-enroll-status/" + studentId + "/" + course_id)
        .then((res) => {
          if (res.data.bool === true) {
            setenrollStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }

    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus === "true") {
      setuserLoginStatus("success");
    }
  }, []);

  document.title = `Course - ${courseData.title}`;

  // Enroll in the course
  const enrollCourse = () => {
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("student", studentId);
    try {
      axios
        .post(baseUrl + "/student-enroll-course/", _formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "You have successfully enrolled in this course",
              icon: "success",
              toast: true,
              timer: 10000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setenrollStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3 pb-2">
      <div className="row">
        <div className="col-4">
          <img
            src={courseData.featured_img}
            className="img-thumbnail"
            alt={courseData.title}
          />
        </div>
        <div className="col-8">
          <h3>{courseData.title}</h3>
          <p>{courseData.description}</p>
          <p className="fw-bold">
            Course By:{" "}
            <Link to={`/teacher-detail/${teacherData.id}`}>
              {teacherData.full_name}
            </Link>
          </p>

          <p className="fw-bold">Duration: 3 Hours 30 Minuts</p>
          <p className="fw-bold">
            Total Enrolled: {courseData.total_enrolled_students} Student(s){" "}
          </p>

          {enrollStatus === "success" && userLoginStatus === "success" && (
            <p>
              <span>You are arleady enrolled in this course</span>
            </p>
          )}
          {userLoginStatus === "success" && enrollStatus !== "success" && (
            <p>
              <button
                onClick={enrollCourse}
                type="button"
                className="btn btn-success"
              >
                Enroll in this course
              </button>
            </p>
          )}

          {userLoginStatus !== "success" && (
            <p>
              <Link to="/user-login">
                Please login to enroll in this course
              </Link>
            </p>
          )}
        </div>
      </div>
      {/* Course Videos */}
      {enrollStatus === "success" && userLoginStatus === "success" && (
        <div className="card mt-4">
          <h5 className="card-header">In this course</h5>
          <ul className="list-group list-group-flush">
            {chapterData.map((chapter, index) => (
              <li className="list-group-item" key={chapter.id}>
                {chapter.title}
                <span className="float-end">
                  <span className="me-5">{chapter.chapter_duration}</span>

                  {chapter.video && (
                    <button
                      className="btn btn-sm btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target={`#videoModal${chapter.id}`}
                    >
                      <i className="bi-youtube"></i>
                    </button>
                  )}
                </span>
                {/* Video Modal Start */}
                <div
                  className="modal fade"
                  id={`videoModal${chapter.id}`}
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          {chapter.title}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="ratio ratio-16x9">
                          {/* <iframe src={chapter.video}  title={chapter.title} ></iframe> */}
                          <video width="320" height="240" controls>
                            <source src={chapter.video} type="video/mp4" />
                            <source src={chapter.video} type="video/mkv" />
                          </video>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Video Modal */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CourseDetail;
