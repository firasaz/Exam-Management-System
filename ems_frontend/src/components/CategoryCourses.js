import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function CategoryCourses() {
  const [courseData, setCourseData] = useState([]);
  const { category_id, category_slug } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + "/course/?category=" + category_id).then((res) => {
        setCourseData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-3">
      <h3 className="pb-1 mb-4 ">{category_slug}</h3>
      <div className="row mb-4">
        {courseData &&
          courseData.map((course, index) => (
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to={`/detail/${course.id}`}>
                  <img
                    className="card-img-top"
                    src={course.featured_img}
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
    </div>
  );
}

export default CategoryCourses;
