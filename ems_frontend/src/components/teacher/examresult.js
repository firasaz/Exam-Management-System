import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/api";

function ExamResult(props) {
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/fetch-exam-result/${props.exam}/${props.student}`)
        .then((res) => {
          setResultData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">
            Exam Result
          </h5>
          <button
            type="button"
            className="btn-close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <table className="table">
            <tr>
              <td>Total Questions</td>
              <td>{resultData.total_questions}</td>
            </tr>
            <tr>
              <td>Attempted Questions</td>
              <td>{resultData.total_attempted_questions}</td>
            </tr>
            <tr>
              <td>Correct Answers</td>
              <td>{resultData.total_correct_questions}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ExamResult;
