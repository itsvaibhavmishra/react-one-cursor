// ############################################
// React One Cursor By Vaibhaw Mishra
// A lightweight component package that will follow your cursor
// ############################################

import { useEffect, useState, useRef, useCallback } from "react";
import "./App.css";

const CursorFollow = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [smallCirclePosition, setSmallCirclePosition] = useState({
    x: 0,
    y: 0,
  });
  const [bigCirclePosition, setBigCirclePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false); // Track if the cursor is hovering over a link or button
  const requestRef = useRef();

  // Track the cursor position
  const handleMouseMove = (event) => {
    setCursor({ x: event.clientX, y: event.clientY });
  };

  // Function to smoothly update the position with different delays for both circles
  const animate = useCallback(() => {
    setSmallCirclePosition((prevPosition) => {
      const smallCircleDelay = 0.38; // Smaller delay for the small circle
      const x = prevPosition.x + (cursor.x - prevPosition.x) * smallCircleDelay;
      const y = prevPosition.y + (cursor.y - prevPosition.y) * smallCircleDelay;
      return { x, y };
    });

    setBigCirclePosition((prevPosition) => {
      const bigCircleDelay = 0.2; // Larger delay for the big circle
      const x = prevPosition.x + (cursor.x - prevPosition.x) * bigCircleDelay;
      const y = prevPosition.y + (cursor.y - prevPosition.y) * bigCircleDelay;
      return { x, y };
    });

    requestRef.current = requestAnimationFrame(animate);
  }, [cursor.x, cursor.y]);

  // Hover events for links and buttons using event delegation
  const handleMouseEnter = (event) => {
    if (event.target.closest("a, button")) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = (event) => {
    if (event.target.closest("a, button")) {
      setIsHovering(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    // Start animation loop
    requestRef.current = requestAnimationFrame(animate);

    // Event delegation to capture hover events on all <a> and <button>
    document.body.addEventListener("mouseenter", handleMouseEnter, true);
    document.body.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
      document.body.removeEventListener("mouseenter", handleMouseEnter, true);
      document.body.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, [animate]);

  return (
    <>
      {/* Small Circle */}
      <div
        className={`small-circle ${isHovering ? "hovering" : ""}`}
        style={{
          left: smallCirclePosition.x - 2, // Small circle's center at position
          top: smallCirclePosition.y - 2, // Small circle's center at position
        }}
      ></div>
      {/* Big Circle */}
      <div
        className={`big-circle ${isHovering ? "hovering" : ""}`}
        style={{
          left: bigCirclePosition.x - 14, // Big circle's center at position
          top: bigCirclePosition.y - 14, // Big circle's center at position
        }}
      ></div>
    </>
  );
};

export default CursorFollow;
