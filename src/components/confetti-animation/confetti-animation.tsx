import { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface ShowLength {
  time: number;
}

export default function ConfettiAnimation(props: ShowLength) {
  const [showConfetti, setShowConfetti] = useState<boolean>(true);
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), props.time)
  }, [props.time]);

  useEffect(() => {
    setWidth(document.body.scrollWidth);
    setHeight(document.body.scrollHeight);
  })

  return (
    showConfetti ?
      <Confetti
        width={width}
        height={height}
        recycle={showConfetti}
        numberOfPieces={200}
        data-testid="confetti animation"
      />
    :
      <div data-testid="confetti hidden" />
  )
}
