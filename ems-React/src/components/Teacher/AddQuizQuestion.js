import { Form, Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function AddQuizQuestion() {
  const baseUrl = "http://127.0.0.1:8000/api";
  const choices = useRef(null);
  const add = useRef(null);
  const del = useRef(null);
  const btns = useRef(null);
  const [questionData, setquestionData] = useState({
    question: "",
    type:"MCQ",
    points:"",
    choices:[],
  });
  const [counter, setCounter] = useState(3);  

  const handleChange = (event) => {
    if (event.target.name !== "ans") {
      setquestionData({
        ...questionData,
        [event.target.name]: event.target.value,
      });
    }

    switch(event.target.name) {
      case "type":
        const hidden = choices.current;
        const buttons = btns.current;
        buttons.style.display = hidden.style.display = event.target.value === "MCQ" ? 'block' : 'none';
        break;

      case "check":
        console.log(event.target.checked);
        break;

      case "ans":
        console.log(questionData.choices)
        switch(event.target.id) {
          case "choice 1":
            questionData.choices[0] = event.target.value;
            break;
          case "choice 2":
            questionData.choices[1] = event.target.value;
            break;
          case "choice 3":
            questionData.choices[2] = event.target.value;
            break;
          case "choice 4":
            questionData.choices[3] = event.target.value;
            break;
          case "choice 5":
            questionData.choices[4] = event.target.value;
            break;
        }
    };
  };

  const addChoice = (e) => {
    e.preventDefault();
    setCounter(counter => counter + 1);
    questionData.choices.push("");
    console.log(questionData.choices);

    const div = document.createElement('div');
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'ans');
    input.setAttribute('id', `choice ${counter}`);
    input.setAttribute('class', 'form-control');
    input.addEventListener('change', handleChange);

    div.id = `choice-div-${counter}`;
    div.className = "mb-3";
    div.innerHTML = `
    <label for="title" class="form-label">
      Ans ${counter}
    </label>
    `;
    div.appendChild(input);
    const targetNode = document.getElementById('choices');
    targetNode.appendChild(div);
  };

  const delChoice = (e) => {
    e.preventDefault();
    setCounter(counter => counter - 1);
    const choice = document.getElementById(`choice-div-${counter-1}`);
    choice.parentNode.removeChild(choice);
    // delete questionData.choices[`choice ${counter-1}`]
    questionData.choices.pop();
    console.log(questionData.choices);
  }

  const choicesCreate = (q_id) => {
    for (let choice in questionData.choices) {
      const _formData = new FormData();
      _formData.append("text", questionData.choices[choice]);
      _formData.append("question", q_id);
      choice === '0' ? _formData.append("correct", "true") :_formData.append("correct", "false")

      axios.post(`${baseUrl}/answer/`, _formData, 
      {
        headers: { "Content-Type": "application/json" }
      }).then((res) => {
        if (res.status === 201) {
          Swal.fire
          ({
            title: "Answer has been created",
            icon: "success",
            toast: true,
            timer: 1000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          })
        }
      }).catch((error) => {
        if(error.response) {
          Swal.fire({
            title:"Oops! Something wrong happened.",
            icon: "error",
            toast: false,
            timer: 1500,
            position: "top-right",
            timerProgressBar: false,
            showCloseButton: true,
          })
        }
      })
    }
  };

  const { quiz_id } = useParams();
  localStorage.setItem("exam_id", quiz_id)

  const questionCreate = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("question", questionData.question);
    formData.append("exam", quiz_id);
    formData.append("type", questionData.type);
    formData.append("points", questionData.points);
    if (questionData.type === "MCQ") {formData.append("answers", questionData.choices)};
    console.log(questionData);
    const res = await axios.post(`${baseUrl}/add-question/`, formData, 
    {
      headers: {
        "Content-Type": "application/json",
      }, 
    }).catch((error) => {
        if(error.response) {
          Swal.fire
          ({
            title:"Oops! Something wrong happened.",
            icon: "error",
            toast: true,
            timer: 1500,
            position: "top-right",
            timerProgressBar: false,
            showConfirmButton: false,
          })
        };
      })
      setTimeout(function() {choicesCreate(res.data.id)},2100);

      if (res.status === 201) {
        Swal.fire({
          title: "Question has been created",
          icon: "success",
          toast: true,
          timer: 2000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
  };
  
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <div className="col-9">
          <div className="card">
            <h5 className="card-header">
              Add Question{" "}
              <Link
                className="btn btn-success btn-sm float-end"
                to={`/all-questions/${quiz_id}`}
              >
                All Questions
              </Link>
            </h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="question" className="form-label">
                    Question
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="question"
                    id="question"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="points" className="form-label">
                    Question Points
                  </label>
                  <input
                    type="number"
                    onChange={handleChange}
                    name="points"
                    id="points"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Type
                  </label>
                  <select
                    onClick={handleChange}
                    name="type"
                    id="type"
                    className="form-control"
                  >
                  <option key='choice 1' value='MCQ'>Multiple Choice</option>
                  <option key='choice 2' value='Classical Question' name="Classical Question" onClick={handleChange}>Classical Question</option>
                  </select>
                </div>

                <div className="mb-3" ref={choices} id="choices">
                  <div id="choice-div-1" className="mb-3">
                    <label htmlFor="title" className="form-label" >
                      Ans 1
                    </label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="ans"
                      id="choice 1"
                      placeholder="Type correct answer here"
                      className="form-control"
                    />
                    {/* <input className="form-check-input" type="checkbox" value="" id="correctAnswer-1" name="check" onClick={handleChange} />
                    <label className="form-check-label ms-1" htmlFor="correctAnswer-1">
                      Correct
                    </label> */}
                  </div>

                  <div id="choice-div-2" className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Ans 2
                    </label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="ans"
                      id="choice 2"
                      className="form-control"
                    />
                    {/* <input className="form-check-input" type="checkbox" value="" id="correctAnswer-2" name="check" onClick={handleChange} />
                    <label className="form-check-label ms-1" htmlFor="correctAnswer-2">
                      Correct
                    </label> */}
                  </div>
                </div>

                <div id="btns" ref={btns}>
                  <button
                    className="btn btn-secondary mb-3 me-3"
                    ref={add}
                    onClick={addChoice}
                  >+</button>
                  <button
                    className="btn btn-secondary mb-3 me-3"
                    ref={del}
                    onClick={delChoice}
                  >-</button>
                </div>
                {/* <div className="mb-3">
                  <label for="title" className="form-label">
                    Right Answer
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="right_ans"
                    id="title"
                    className="form-control"
                  />
                </div> */}

                <button
                  type="button"
                  onClick={questionCreate}
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

export default AddQuizQuestion;
