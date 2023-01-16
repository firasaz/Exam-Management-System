import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/api";

function CheckExamStatusforStd(props) {
  const [examData, setExamData] = useState([]);
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    try {
      axios
        .get(
          `${baseUrl}/fetch-exam-attempt-status/${props.exam}/${props.student}`
        )
        .then((res) => {
          setExamData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <td>
      {examData.bool === true && (
        <span className="text-success">Attempted </span>
      )}

      {examData.bool === false && (
        <Link
          to={`/take-exam/${props.exam}`}
          className="btn btn-success btn-sm ms-2"
        >
          Take Exam
        </Link>
      )}
    </td>
  );
}

export default CheckExamStatusforStd;
