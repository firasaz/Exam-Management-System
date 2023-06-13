import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

function CheckQuizinCourse(props) {
  const [quizData, setquizData] = useState([]);
  const studentId = localStorage.getItem("studentId");
  // Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(`${baseUrl}/fetch-quiz-attempt-status/${props.exam}/${props.student}/`).then((res) => {
          setquizData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <td>
      {quizData.bool === true && 
        <Link 
          to={`/show-student-answers/${props.student}/${props.exam}`}
          className="text-success ms-2">
            Attempted
        </Link>}
      {/* {quizData.bool === true && !props.student ? (
        <Link 
          to={`/show-student-answers/${props.student}/${props.exam}`}
          className="text-success ms-2">
            Attempted
        </Link>) : (
        <span className="text-success ms-2">
          Attempted
        </span>
      )} */}

      {quizData.bool === false && !props.teacher && (
        <Link
          to={`/take-quiz/${props.exam}`}
          className="btn btn-success btn-sm ms-2"
        >
          Take Exam
        </Link>
      )}

      {quizData.bool === false && props.teacher && props.student && (
        <Link 
        to={`#`}
        className="text-danger text-decoration-none text-select ms-2">
          Not Attempted
        </Link>
      )}
    </td>
  );
}

export default CheckQuizinCourse;
