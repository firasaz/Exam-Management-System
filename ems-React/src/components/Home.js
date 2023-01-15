import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function Home() {
  const [courseData, setCourseData] = useState([]);

  // Fetch courses when page load
  useEffect(() => {
    // Fetch 4 courses
    try {
      axios.get(`${baseUrl}/course/?result=4`).then((res) => {
        setCourseData(res.data);
        console.log(res.data)
        console.log(res.data.results)
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  document.title = "Home Page";

  return (
    <div className="container mt-4">
      {/* Enrolled Courses */}
      <h3 className="pb-1 mb-4">
        Enrolled Courses{" "}
        <Link to="/all-courses" className="float-end btn btn-primary">
          See All
        </Link>
      </h3>
      <div className="row mb-4">
        {courseData &&
          courseData.map((course, index) => (
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to={`/detail/${course.id}`}>
                  <img
                    src={course.featured_img}
                    className="card-img-top"
                    alt={course.title}
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
      {/* End enrolled Courses */}
    </div>
  );
}

export default Home;
