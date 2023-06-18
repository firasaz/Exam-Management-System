import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";
function MyCourses() {
  const [courseData, setCourseData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");

  // Delete Data
  const handleDelete = (course_id) => {
    Swal.fire({
      title: "Confirm",
      text: "Are you sure you want to delete this data?",
      icon: "info",
      confirmButtonText: "Conitnue",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(`${baseUrl}/delete-course/${course_id}/`).then((res) => {
            Swal.fire("success", "Data has been deleted.");
            /* we all the backend again if deletion was a success to refresh the page */
            try {
              axios.get(`${baseUrl}/teacher-courses/${teacherId}/`).then((res) => {
                setCourseData(res.data);
              });
            } catch (error) {
              console.log(error);
            }
          });
        } catch (error) {
          Swal.fire("error", "Data has not been deleted!!");
        }
      } else {
        Swal.fire("error", "Data has not been deleted!!");
      }
    });
  };
  // Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(`${baseUrl}/teacher-courses/${teacherId}/`).then((res) => {
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [teacherId]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Total Enrolled</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courseData.map((course, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={`/quiz/`}>
                          {course.title}
                        </Link>
                      </td>
                      <td>
                        <img
                          src={course.featured_img}
                          width="80"
                          className="rounded"
                          alt={course.title}
                        />
                      </td>
                      <td>
                        <Link to={`/enrolled-students/` + course.id}>
                          {course.total_enrolled_students}
                        </Link>
                      </td>
                      <td>
                        <Link
                          className="btn btn-info btn-sm"
                          to={`/edit-course/` + course.id}
                        >
                          Edit
                        </Link>

                        <Link
                          className="btn btn-warning btn-sm mx-2"
                          to={`/assign-quiz/` + course.id}
                        >
                          Assign Exam
                        </Link>
                        <button 
                          className="btn btn-danger btn-sm mx-2"
                          onClick={() => handleDelete(course.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyCourses;
