import { useParams } from "react-router-dom";
import TeacherSideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function AddAssignment() {
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    detail: "",
  });

  const handleChange = (event) => {
    setAssignmentData({
      ...assignmentData,
      [event.target.name]: event.target.value,
    });
  };

  const { teacher_id } = useParams();
  const { student_id } = useParams();

  const formSubmit = () => {
    const _formData = new FormData();

    _formData.append("teacher", teacher_id);
    _formData.append("student", student_id);
    _formData.append("title", assignmentData.title);
    _formData.append("detail", assignmentData.detail);

    try {
      axios
        .post(
          baseUrl + "/student-assignment/" + teacher_id + "/" + student_id,
          _formData
        )
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "Assignment has been added",
              icon: "success",
              toast: true,
              timer: 5000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Add Assignment";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <div className="col-9">
          <div className="card">
            <h5 className="card-header">Add Assignment</h5>
            <div className="card-body">
              <form>
                <div className="mb-3 ">
                  <label for="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="title"
                    id="title"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="detail" className="form-label">
                    Detail
                  </label>
                  <textarea
                    onChange={handleChange}
                    className="form-control"
                    id="detail"
                    name="detail"
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

export default AddAssignment;
