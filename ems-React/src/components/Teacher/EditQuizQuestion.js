import Swal from "sweetalert2"
import axios from 'axios'
import TeacherSidebar from './TeacherSidebar'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const baseUrl = "http://127.0.0.1:8000/api";

function EditQuizQuestion() {
  const [questionData, setQuestionData] = useState({
    question: "",
    type:"MCQ",
    points:"",
    choices:[],
  }); // i could've just typed useState({}) without specifying the elements of questionData
  const {question_id} = useParams();

  const handleChange = (e) => {
    if(e.target.id.includes('choice')) {
      const choices = [...questionData.choices]
      choices[e.target.name].text=e.target.value

      setQuestionData({
        ...questionData,
        choices: choices,
      })
    } else {
      setQuestionData({
        ...questionData,
        [e.target.name]: e.target.value,
      })
    }
  };

  const choicesCreate = (questionData) => {
    for (let i in questionData.choices) {
      console.log(questionData.choices[i].text)
      const choice_id = questionData.choices[i].id
      const _formData = new FormData();
      _formData.append("text", questionData.choices[i].text);
      _formData.append("question", question_id);
      i === '0' ? _formData.append("correct", "true") : _formData.append("correct", "false")

      axios.put(`${baseUrl}/answer/${choice_id}/`, _formData, 
      {
        headers: { "Content-Type": "application/json" }
      }).then((res) => {
        if ( res.status === 200 || res.status === 201 ) {
          Swal.fire
          ({
            title: "Answer has been updated",
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

  const exam = localStorage.getItem("exam_id")
  const formSubmit = async(e) => {
    e.preventDefault()
    console.log(questionData)    

    const _formData = new FormData()
    _formData.append("question", questionData.question)
    _formData.append("type", questionData.type)
    _formData.append("points", questionData.points)
    _formData.append("answers", questionData.choices)
    _formData.append("exam", exam)
    try {
      await axios.put(`${baseUrl}/add-question/${question_id}/`, _formData, 
      {
        headers: {'Content-Type': 'application/json'}
      }).then((res) => {
        if ( res.status === 200 || res.status === 201 ) {
          Swal.fire({
            title: "Data has been updated",
            icon: "success",
            toast: true,
            timer: 2500,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        } else {
          console.log(res.status);
          console.log(res.status.error);
        }
      })
    } catch (error) { console.log(error) }

    setTimeout( () => choicesCreate(questionData), 2500 )
  };

  useEffect(() => {
    axios.get(`${baseUrl}/add-question/${question_id}/`).then((res) => {
      console.log(res.data)
      setQuestionData({
          question: res.data.question,
          type: res.data.type,
          points: res.data.points,
          choices: res.data.answers,
      })
    })
  }, [question_id]);
  
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <div className="col-9">
          <div className="card">
            <h5 className='card-header'>
              Edit Question
              <Link
              className="btn btn-success btn-sm float-end"
              to={`/all-questions/${question_id}`}
              >
              All Questions
              </Link>
            </h5>
            <div className="card-body">
              <form onSubmit={formSubmit}>
                <div className="mb-3">
                  <label htmlFor="question" className="form-label">
                    Question
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="question"
                    id="question"
                    value={questionData.question}
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
                    value={questionData.points}
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
                  <option key='choice 2' value='Classical Question'>Classical Question</option>
                  </select>
                </div>

                <div className="mb-3" id="choices">
                  {questionData.choices?.map((qtn, index) => (
                    <div id={`choice-div-${index}`} key={index} className="mb-3">
                      <label htmlFor={`choice[${index}]`} className="form-label" >
                        {`Ans ${index+1}`}
                      </label>
                      <input
                        onChange={handleChange}
                        // placeholder="Type correct answer here"
                        type="text"
                        name={index}
                        id={`choice-${index+1}`}
                        value={qtn?.text}
                        className="form-control"
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
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
  )
}

export default EditQuizQuestion
