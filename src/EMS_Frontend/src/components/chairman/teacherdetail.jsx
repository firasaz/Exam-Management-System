import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1/api";

function TeacherDetail() {
  useEffect(() => {
    document.title = "Teacher Details";
  });

  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  let { teacher_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + "/teacher/" + teacher_id).then((res) => {
        setCourseData(res.data.teacher_courses);
        setTeacherData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img src="/logo512.png" class="img-thumbnail" alt="Teacher" />
        </div>
        <div className="col-8">
          <h3>{teacherData.full_name}</h3>
          <p>{teacherData.qualifications}</p>
          <p className="fw-bold">
            Course By: <Link to="/teacher-detail/1">Teacher 1</Link>
          </p>

          <p className="fw-bold">Office number: cmpe201</p>
        </div>
      </div>

      <div className="card mt-4 ">
        <h5 className="card-header">Course List</h5>
        <div className="list-group list-group-flush">
          {courseData.map((course, index) => (
            <Link
              to={`/detail/${course.id}`}
              className="list-group-item list-group-item-action"
            >
              {course.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherDetail;
