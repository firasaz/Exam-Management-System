
import Sidebar from "./Sidebar";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Timer from "../Timer"; // import the Timer component

const baseUrl = "http://127.0.0.1:8000/api";

function TakeQuiz() {
  const [questionData, setquestionData] = useState([]);
  const { quiz_id } = useParams();
  const studentId = localStorage.getItem("studentId");
  const dataDict = {};

  useEffect(() => {
    try {
      axios.get(`${baseUrl}/exam-questions/${quiz_id}/`).then((res) => {
        console.log(res.data);
        setquestionData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    
  }, []);

const handleChange = (event) => {
  console.log(event.target.name)
  console.log(dataDict)
  // setanswerData({
  //   ...answerData,
  //   [event.target.id]: event.target.value, // set the id of each answer to the checked value of it
  dataDict[event.target.name] = event.target.value
}

  const submitAnswer = (e) => {
    e.preventDefault();
    
    const dataDict = {}
    dataDict["student"] = studentId;

    const choices = document.getElementsByClassName('ans');
    for(let i=0; i<choices.length; i++) {
      const element = choices[i];

      if (element.checked) { // add the choice, which has the question and its corresponding value, from the form in the dictionary
        dataDict[element.name] = element.value
        console.log("dataDict")
        console.log(dataDict)
      }
      else {
        if (!dataDict[element.name]) {
          dataDict[element.name] = null // add the unanswered question and give it a value of null
        }
      }
    }

    try {
      axios.post(`${baseUrl}/answer-exam/${quiz_id}/`, dataDict, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => {
        if (res.status === 200 || res.status === 201) {
          // window.location.href = "/my-courses"
          console.log(res)
        }
      });
    } catch(error) {
      console.log(error);
    }
    window.location.href="/user-dashboard"
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
          <Timer minutes={1} />
        </aside>
        <section className="col-md-9">
            <h4 className="mb-3 border-bottom pb-1">
              Exam: <span className="text-danger">{questionData[0]?.exam}</span>
            </h4>
            <form method="POST">
              {questionData.map((row, index) => (
                <>
                  {console.log(index)}
                  <div className="card" key={index}>
                    <h5 className="card-header">{row?.question}</h5>
                    <div className="card-body">
                      <table className="table table-bordered">
                        <tbody>
                          <>
                            {/* {row.type === "MCQ" ? () : ()} */}
                            {row.answers.map((ans,index2) => {
                              return (
                                <tr key={index2}>
                                  <td>
                                    {/* 'input' tag must be self closed */}
                                    <input
                                      type='radio'
                                      id={ans?.id} // set the id of each answer(or choice) to be the id of it in the backend
                                      points={row.points}
                                      // name={ans.question} // set the name of each answer to be the question this answer is for
                                      name={row.id} // set the name of each answer to be the question this answer is for
                                      // onClick = {() => submitAnswer(ans?.id, ans?.ans1)}
                                      onClick={handleChange}
                                      value={ans.text}
                                      className = "btn btn-outline-secondary ans" />
                                      <label htmlFor={ans?.id}>{ans.text}</label>
                                  </td>
                                </tr>)
                              })}
                          </>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ))}

              <button
                  type="button"
                  onClick={submitAnswer}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              {/* <input
                type="submit"
                // onClick={formSubmit}
                value="submit"
                className="btn btn-primary" /> */}
            </form>
        </section>
      </div>
    </div>
  );
}

export default TakeQuiz;