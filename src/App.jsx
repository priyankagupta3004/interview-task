import { useState , useEffect} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [timeInput, setTimeInput] = useState(0); // Input time in minutes
  const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds
  const [isActive, setIsActive] = useState(false); // Timer active or paused
  const [isPaused, setIsPaused] = useState(false); // Timer paused state
  const [initialTime, setInitialTime] = useState(0); // Save original input time

  // Convert timeLeft (in seconds) to MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Handle the countdown logic
  useEffect(() => {
    let timer;
    if (isActive && !isPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(timer); // Clean up the timer on unmount
  }, [isActive, isPaused, timeLeft]);

  // Handle input time change
  const handleTimeInputChange = (e) => {
    setTimeInput(e.target.value);
  };

  // Start the countdown
  const startTimer = () => {
    const totalTimeInSeconds = timeInput * 60;
    setTimeLeft(totalTimeInSeconds);
    setInitialTime(totalTimeInSeconds);
    setIsActive(true);
    setIsPaused(false);
  };

  // Pause the countdown
  const pauseTimer = () => {
    setIsPaused(true);
  };

  // Resume the countdown
  const resumeTimer = () => {
    setIsPaused(false);
  };

  // Reset the countdown
  const resetTimer = () => {
    setTimeLeft(initialTime);
    setIsActive(false);
    setIsPaused(false);
  };

  return (
    <div className="countdown-timer">
      <h1>Countdown Timer</h1>
      <div className="time-input">
        <input
          type="number"
          value={timeInput}
          onChange={handleTimeInputChange}
          placeholder="Enter time in minutes"
          disabled={isActive} // Disable input while the timer is running
        />
      </div>
      <div className="time-display">
        <h2>{formatTime(timeLeft)}</h2>
      </div>
      <div className="buttons">
        {!isActive ? (
          <button className="start-btn" onClick={startTimer}>
            Start
          </button>
        ) : isPaused ? (
          <button className="resume-btn" onClick={resumeTimer}>
            Resume
          </button>
        ) : (
          <button className="pause-btn" onClick={pauseTimer}>
            Pause
          </button>
        )}
        <button className="reset-btn" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  
  )
}

export default App
