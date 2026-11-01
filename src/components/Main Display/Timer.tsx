import { useState, useEffect } from "react";

const Timer = ({ style }: { style: boolean }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    // Function to calculate the time remaining until the next day
    const calculateTimeRemaining = () => {
      const now = new Date();
      const tomorrow = new Date();

      // Next puzzle is at midnight CST (6 AM UTC), same as the backend
      tomorrow.setUTCHours(6, 0, 0, 0);
      if (tomorrow.getTime() <= now.getTime()) {
        tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
      }

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

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  return (
    <div id="timer" className={style ? "flex gap-1" : ""}>
      <p>Next puzzle in:</p>
      <p>{formatTime(timeRemaining)}</p>
    </div>
  );
};

export default Timer;
