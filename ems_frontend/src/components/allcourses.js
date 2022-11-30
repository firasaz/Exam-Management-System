import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

function AllCourses() {
  useEffect(() => {
    document.title = "All Courses";
  });

  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    try {
      axios.get(baseUrl + "/course/").then((res) => {
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-3">
      <h3 className=" pb-1 mb-4">All Courses</h3>
      <div className="row mb-4">
        {courseData &&
          courseData.map((course, index) => (
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to={`/detail/${course.id}`}>
                  <img
                    src={course.featured_img}
                    alt={course.title}
                    className="card-img-top"
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/detail/${course.id}`}>{course.title}</Link>
                  </h5>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AllCourses;
