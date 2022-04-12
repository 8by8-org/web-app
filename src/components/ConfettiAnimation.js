import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { delay } from "./../functions/UserData";

function ConfettiAnimation(props) {
  // gets the total height of the page content
  var page_height = document.body.offsetHeight
    ? document.body.offsetHeight
    : document.height;

  const [maxWidth, setMaxWidth] = useState(window.innerWidth - 20);
  const [maxHeight, setMaxHeight] = useState(page_height);
  const [showConfetti, setShowConfetti] = useState(true);

  const [confetti, setConfetti] = useState(
    <Confetti
      width={maxWidth}
      height={maxHeight}
      recycle={showConfetti}
      numberOfPieces={200}
    />
  );

  useEffect(() => {
    startConfettiTimer(props.time);
    window.addEventListener("resize", () => {
      setMaxWidth(window.innerWidth - 20);

      page_height = document.body.offsetHeight
        ? document.body.offsetHeight
        : document.height;
      setMaxHeight(page_height);
    });
  }, []);

  useEffect(() => {
    setConfetti(
      <Confetti
        width={maxWidth}
        height={maxHeight}
        recycle={showConfetti}
        numberOfPieces={200}
      />
    );
  }, [maxHeight, maxWidth, showConfetti]);

  async function startConfettiTimer(time) {
    await delay(time);
    setShowConfetti(false);
  }

  return confetti;
}

export default ConfettiAnimation;
