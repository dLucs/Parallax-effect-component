import React, { useEffect, useRef } from "react";
import profilePic from "../../src/assets/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction.jpg";

const Card = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    const update = ({ x, y }) => {
      const bounds = cardRef.current.getBoundingClientRect();
      // Calculate the range between the center and the pointer position.
      const posX = x - bounds.x;
      const posY = y - bounds.y;
      const ratioX = posX / bounds.width;
      const ratioY = posY / bounds.height;
      cardRef.current.style.setProperty("--ratio-x", ratioX);
      cardRef.current.style.setProperty("--ratio-y", ratioY);
    };

    document.body.addEventListener("pointermove", update);

    return () => {
      document.body.removeEventListener("pointermove", update);
    };
  }, []);

  return (
    <div ref={cardRef} className="card">
      <img src={profilePic} alt="" />
    </div>
  );
};

export default Card;
