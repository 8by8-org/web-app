// returns "challenger" or "player"
export function getUserType() {
  const playerStatus = localStorage.getItem("player");
  if (playerStatus) {
    return "player";
  } else {
    return "challenger";
  }
}
