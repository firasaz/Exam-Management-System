import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1/8000/api";
// const siteUrl = "http://127.0.0.1/8000/";

function CourseDetail() {
  useEffect(() => {
    document.title = "Course Details";
  });

  let { course_id } = useParams();

  const [examData, setExamData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const studentId = localStorage.getItem("studentId");
  const [userLoginStatus, setUserLoginStatus] = useState([]);
  const [enrollStatus, setEnrollStatus] = useState([]);

  useEffect(() => {
    //fetch courses
    try {
      axios.get(baseUrl + "/course/" + course_id).then((res) => {
        console.log(res);
        setCourseData(res.data);
        setExamData(res.data.course_exams);
        setTeacherData(res.data.teacher);
      });
    } catch (error) {
      console.log(error);
    }

    //fetch enroll status
    try {
      axios
        .get(baseUrl + "/fetch-enroll-status/" + studentId + "/" + course_id)
        .then((res) => {
          if (res.data.bool === true) {
            setEnrollStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }

    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus === "true") {
      setUserLoginStatus("success");
    }
  }, []);

  const enrollCourse = () => {
    const formData = new FormData();
    formData.append("course", course_id);
    formData.append("student", studentId);

    try {
      axios
        .post(baseUrl + "/student-enroll-course/", formData, {
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
              timer: 5000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setEnrollStatus("success");
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
            class="img-thumbnail"
            alt={courseData.title}
          />
        </div>
        <div className="col-8">
          <h3>{courseData.title}</h3>
          <p>{courseData.description}</p>
          <p className="fw-bold">
            Course By:
            <Link to={`/teacher-detail/${teacherData.id}`}>
              {teacherData.full_name}
            </Link>
          </p>
          <p className="fw-bold">
            Total Enrolled: {courseData.total_enrolled_students} student(s)
          </p>
          {enrollStatus === "success" && userLoginStatus === "success" && (
            <p>
              <span>You are already enrolled</span>
            </p>
          )}

          {userLoginStatus === "success" && enrollStatus !== "success" && (
            <p>
              <button
                type="button"
                onClick={enrollCourse}
                className="btn btn-success"
              >
                Enroll
              </button>
            </p>
          )}

          {userLoginStatus !== "success" && (
            <p>
              <Link to="/student-login">Please login to enroll</Link>
            </p>
          )}
        </div>
      </div>

      {enrollStatus === "success" && userLoginStatus === "success" && (
        <div className="card mt-4 ">
          <h3 className="card-header">Exams</h3>
          <ul className="list-group list-group-flush ">
            {examData.map((exam, index) => (
              <li className="list-group-item " key={exam.id}>
                {exam.title}
                <button className="btn btn-sm btn-outline-primary float-end">
                  Take the Exam
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CourseDetail;
