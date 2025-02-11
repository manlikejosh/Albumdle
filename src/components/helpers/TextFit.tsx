import { useCallback, useEffect, useRef } from "react";
import textFit from "textfit";

const FitText = ({
  children,
  maxFontSize = 14,
}: {
  children: React.ReactNode;
  maxFontSize?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const fit = useCallback(() => {
    if (ref.current) {
      textFit(ref.current, {
        alignHoriz: true,
        alignVert: true,
        maxFontSize,
        multiLine: true,
      });
    }
  }, [maxFontSize]);

  useEffect(() => {
    fit();
  }, [fit, children]);

  return (
    <div
      ref={ref}
      className="w-full h-full flex items-center justify-center text-center break-words"
      style={{ wordBreak: "break-word" }}
    >
      {children}
    </div>
  );
};

export default FitText;
