import { useState, useEffect } from "react";

const Timer = ({ style }: { style: boolean }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    // Function to calculate the time remaining until the next day
    const calculateTimeRemaining = () => {
      const now = new Date();
      const tomorrow = new Date();

      // Set the time for tomorrow to 00:00:00
      tomorrow.setHours(24, 0, 0, 0);

      const timeDiff = tomorrow.getTime() - now.getTime();
      setTimeRemaining(timeDiff);
    };

    // Calculate time remaining immediately
    calculateTimeRemaining();

    // Update the countdown every second
    const intervalId = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}h:${minutes
      .toString()
      .padStart(2, "0")}m:${seconds.toString().padStart(2, "0")}s`;
  };
  return (
    <div id="timer" className={style ? "flex gap-1" : ""}>
      <p>Next puzzle in:</p>
      <p>{formatTime(timeRemaining)}</p>
    </div>
  );
};

export default Timer;
