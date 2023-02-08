import React, { useEffect, useRef } from "react";

const Card = ({ profilePic }) => {
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

    // Listen for device orientation events.
    window.addEventListener("deviceorientation", (event) => {
      // Extract the beta and gamma values from the event.
      const { beta, gamma } = event;

      // Calculate the bounds of the card element.
      const bounds = cardRef.current.getBoundingClientRect();

      // Calculate the center of the card element.
      const centerX = bounds.x + bounds.width / 2;
      const centerY = bounds.y + bounds.height / 2;

      // Update the position of the card based on the orientation of the device.
      update({
        x: centerX + (beta * bounds.width) / 2,
        y: centerY + (gamma * bounds.height) / 2,
      });
    });

    // Listen for pointer move events.
    document.body.addEventListener("pointermove", (event) => {
      // Update the position of the card based on the pointer position.
      update({ x: event.clientX, y: event.clientY });
    });

    return () => {
      // Remove the device orientation and pointer move event listeners when the component unmounts.
      window.removeEventListener("deviceorientation", update);
      document.body.removeEventListener("pointermove", update);
    };
  }, []);

  return (
    <div ref={cardRef} className="profile-pic">
      <img src={profilePic} alt="" />
    </div>
  );
};

export default Card;
