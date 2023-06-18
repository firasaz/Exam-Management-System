import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Timer(props) {
  const [time, setTime] = useState({ minutes: null, seconds: 0 });
  // const [intervalId, setIntervalId] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get(`http://127.0.0.1:8000/api/exams/${props.exam_id}/`).then((res) => {
        console.log(res.data);
        setTime((time) => ({...time, minutes: res.data.duration}));
      })
    } catch (error) { console.log(error) }
  }, []);
  
  useEffect(() => {    
    const newIntervalId = setInterval(() => {
      if (time.seconds > 0) {
        setTime((time) => ({ ...time, seconds: time.seconds - 1 }));
      } else if (time.minutes === 0 && time.seconds === 0) {
        clearInterval(newIntervalId);
        setIsFinished(true);
        navigate('/user-dashboard', {replace: true})
      // } else if (time.minutes % 60 === 0) {
      //   setTime((time) => ({ ...time, minutes: time.minutes/60 }))
      } else {
        setTime((time) => ({
          ...time,
          minutes: time.minutes - 1,
          seconds: 59,
        }));
      }
    }, 1000);
    // setIntervalId(newIntervalId);
    return () => clearInterval(newIntervalId);
  }, [time]);

  if(time.minutes === null) {
    return <h4 className="mt-2 text-danger text-center">Loading...</h4>
  } else {
    return (
      <div className="mt-2">
        <h1>
          <center>
            Timer: {time.minutes}:
            {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
          </center>
        </h1>
        {isFinished && (
          <strong>
            <div>Time is finished!</div>
          </strong>
        )}
      </div>
    );
  }
}

export default Timer;
