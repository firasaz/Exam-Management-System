import { Form, Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useRef } from "react";
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
  const [added_q_id, setAdded_q_id] = useState(1);

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

      case "ans":
        console.log(questionData.choices)
        switch(event.target.id) {
          case "choice 1":
            // questionData.choices['choice 1'] = event.target.value;
            questionData.choices[0] = event.target.value;
            console.log(questionData.choices);
            break;
          case "choice 2":
            // questionData.choices['choice 2'] = event.target.value;
            questionData.choices[1] = event.target.value;
            break;
          case "choice 3":
            // questionData.choices['choice 3'] = event.target.value;
            questionData.choices[2] = event.target.value;
            break;
          case "choice 4":
            // questionData.choices['choice 4'] = event.target.value;
            questionData.choices[3] = event.target.value;
            break;
          case "choice 5":
            // questionData.choices['choice 5'] = event.target.value;
            questionData.choices[4] = event.target.value;
            break;
          // default:
          //   questionData.choices.push(event.target.value);
        }
        // console.log(questionData.choices);
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

    // const check = document.createElement('input');
    // check.type = "checkbox";
    // check.id = `correctAnswer-${counter}`;
    // check.name = "check";
    // check.setAttribute('class','form-check-input');
    // check.addEventListener('click', handleChange);

    div.id = `choice-div-${counter}`;
    div.className = "mb-3";
    div.innerHTML = `
    <label for="title" class="form-label">
      Ans ${counter}
    </label>
    `;
    div.appendChild(input);
    // div.appendChild(check);
    // div.innerHTML+=`
    // <label class="form-check-label" for="correctAnswer-${counter}">
    // Correct
    // </label>`;
    const targetNode = document.getElementById('choices');
    targetNode.appendChild(div);
  };

  const delChoice = (e) => {
    e.preventDefault();
    setCounter(counter => counter - 1);
    const choice = document.getElementById(`choice-div-${counter-1}`);
    choice.parentNode.removeChild(choice);
    // if (questionData.choices.has(`choice ${counter}`)) {
    //   questionData.choices.delete(`choice ${counter}`)
    // };
    // delete questionData.choices[`choice ${counter-1}`]
    questionData.choices.pop();
    console.log(questionData.choices);
  }

  const choicesCreate = (e) => {
    // e.preventDefault();

    try {
      for (let choice in questionData.choices) {
        const _formData = new FormData();
        _formData.append("text", questionData.choices[choice]);
        _formData.append("question", added_q_id);
        if (choice === 0) {
          _formData.append("correct", "true");
        } else {_formData.append("correct", "false")}
        
        axios.post(`${baseUrl}/answer/`, _formData, {
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          if (res.status === 201) {
            Swal.fire({
              title: "Answer has been created",
              icon: "success",
              toast: true,
              timer: 2000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        })
      };
    } catch(error) {};
  }
  const { quiz_id } = useParams();

  const formSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("question", questionData.question);
    formData.append("exam", quiz_id);
    formData.append("type", questionData.type);
    formData.append("points", questionData.points);
    if (questionData.type === "MCQ") {formData.append("answers", questionData.choices)};
    console.log(questionData);
    try {
      axios.post(`${baseUrl}/add-question/`, formData, {
        headers: {
          "Content-Type": "application/json",
        }, }).then((res) => {
          setAdded_q_id(res.data.id);
          if (res.status === 200 || res.status === 201) {
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
        });
    } catch (error) {
      // console.log(error);
    }

    choicesCreate();
    // setTimeout(choicesCreate(),2500);
    
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

export default AddQuizQuestion;
