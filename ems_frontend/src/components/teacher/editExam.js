import { useParams, Link } from "react-router-dom";
import TeacherSideBar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function EditExam() {
  const [examData, setExamData] = useState({
    course: "",
    title: "",
    description: "",
    f_img: "",
    remarks: "",
  });
  const handleChange = (event) => {
    setExamData({
      ...examData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setExamData({
      ...examData,
      [event.target.name]: event.target.files[0],
    });
  };

  const { exam_id } = useParams();

  const formSubmit = () => {
    const _formData = new FormData();

    _formData.append("course", examData.course);
    _formData.append("title", examData.title);
    _formData.append("description", examData.description);
    _formData.append("featured_img", examData.f_img, examData.f_img.name);
    _formData.append("remarks", examData.remarks);

    try {
      axios
        .put(baseUrl + "/exam/" + exam_id, _formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Data has been updated",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
          //   window.location.href = "/add-exam/1";
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Edit Exam";
  });

  //fetch courses when page load

  useEffect(() => {
    try {
      axios.get(baseUrl + "/exam/" + exam_id).then((res) => {
        setExamData({
          course: res.data.course,
          title: res.data.title,
          description: res.data.description,
          f_img: res.data.f_img,
          remarks: res.data.remarks,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <div className="col-9">
          <div className="card">
            <h5 className="card-header">Update Exam</h5>
            <div className="card-body">
              <form>
                <div className="mb-3 ">
                  <label for="title" className="form-label">
                    Exam Title
                  </label>
                  <input
                    value={examData.title}
                    type="text"
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
                    value={examData.description}
                    onChange={handleChange}
                    className="form-control"
                    id="description"
                    name="description"
                  ></textarea>
                </div>
                <div className="mb-3 row">
                  <label for="image" className="form-label">
                    Course Image
                  </label>

                  <input
                    value={examData.image}
                    name="f_img"
                    id="f_img"
                    onChange={handleFileChange}
                    type="file"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="remarks" className="form-label">
                    Remarks
                  </label>
                  <textarea
                    value={examData.remarks}
                    onChange={handleChange}
                    className="form-control"
                    id="remarks"
                    name="remarks"
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
export default EditExam;
