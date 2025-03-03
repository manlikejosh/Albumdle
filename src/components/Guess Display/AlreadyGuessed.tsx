import { useState, useEffect } from "react";

const AlreadyGuessed = ({ resetKey }: { resetKey: number }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup function
  }, [resetKey]);
  return isVisible ? (
    <>
      <div className="fade-in-out shadow-md absolute top-[25vh] z-50 p-2 rounded-md l text-white bg-gray-400">
        Already Guessed!
      </div>
    </>
  ) : null;
};

export default AlreadyGuessed;
