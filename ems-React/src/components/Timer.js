import React, { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState({ minutes: 30, seconds: 0 });
  // const [intervalId, setIntervalId] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const newIntervalId = setInterval(() => {
      if (time.seconds > 0) {
        setTime((time) => ({ ...time, seconds: time.seconds - 1 }));
      } else if (time.minutes === 0 && time.seconds === 0) {
        clearInterval(newIntervalId);
        setIsFinished(true);
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

  useEffect(() => {
    setTime({ minutes: 1, seconds: 0 });
  }, []);

  return (
    <div>
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

export default Timer;
