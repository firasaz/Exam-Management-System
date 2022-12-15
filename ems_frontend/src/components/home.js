import { Calendar } from "react-calendar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

function Home() {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    try {
      axios.get(baseUrl + "/course/?result=4").then((res) => {
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    document.title = "EMS Home page";
  });

  return (
    <div className="container mt-4">
      <h3 className=" pb-1 mb-4">
        Enrolled Courses{" "}
        <Link to="/all-courses" className="float-end">
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
        {/* <div className="col-md-3 mt-5 mb-4">
          <div className="card">
            <a href="#">
              <img src="logo512.png" class="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Course title</a>
              </h5>
            </div>
          </div>
        </div> */}
      </div>
      <Calendar />
    </div>
  );
}

export default Home;