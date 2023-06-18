import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/api";

function CheckExaminCourse(props) {
  const [examData, setExamData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    try {
      axios
        .get(
          `${baseUrl}/fetch-exam-assign-status/${props.exam}/${props.course}`
        )
        .then((res) => {
          setExamData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const assignExam = (exam_id) => {
    const formData = new FormData();
    formData.append("teacher", teacherId);
    formData.append("course", props.course);
    formData.append("exam", props.exam);

    try {
      axios
        .post(baseUrl + "/exam-assign-course/", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <td>
      {examData.bool === false && (
        <button
          onClick={() => assignExam(props.exam)}
          className="btn btn-success btn-sm ms-2"
        >
          Assign Exam
        </button>
      )}

      {examData.bool === true && (
        <>
          <span className="btn btn-secondary btn-sm">
            Assigned
            <br />
          </span>
          &nbsb;
          <Link
            className="btn btn-info btn-sm"
            to={`/attempted-students/` + props.exam}
          >
            Attempted Students
          </Link>
        </>
      )}
    </td>
  );
}

export default CheckExaminCourse;
