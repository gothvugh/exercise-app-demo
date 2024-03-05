import { useState, useEffect } from 'react'

function Stopwatch() {

    const [time, setTime] = useState(0)
    const [timerOn, setTimerOn] = useState(false)

    useEffect(() => {
        let interval; 

        if(timerOn) {
            interval = setInterval(() => setTime(time + 1), 10)

        }
        return () => clearInterval(interval);
    }, [timerOn, time])

    const hours = Math.floor(time / 360000);

    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);
  
    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);
  
    // Milliseconds calculation
    const milliseconds = time % 100;
  
    //start and stop
    const startAndStop = () => {
      setTimerOn(!timerOn);
    };
  
    // reset timer 
    const reset = () => {
      setTime(0); 
    }

    return (
        <div>
          <p>
            {hours}:{minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}:
            {milliseconds.toString().padStart(2, "0")}
          </p>
          <div>
            <button onClick={startAndStop}>
              {timerOn ? "Stop" : "Start"}
            </button>
            <button onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      )
}

export default Stopwatch;