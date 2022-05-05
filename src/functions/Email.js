import { getUserDatabase, getChallengerDatabase } from "./UserData";

const URL = "https://usvotes-6vsnwycl4q-uw.a.run.app/email/";

const stopEmail = false; // make false when testing emails

export async function emailUser(email, emailType) {
  if (stopEmail) {
    console.log("no email sent to prevent reaching daily limit while testing");
    return;
  }

  let formData = new FormData();
  formData.append("email", email);
  formData.append("type", emailType);

  const userData = await getUserDatabase();

  // emails challenger when badge earned
  if (emailType === "badgeEarned") {
    const challengerData = await getChallengerDatabase();
    let daysLeft = challengerData.challengeEndDate;
    let milisecondsLeft = new Date(daysLeft.seconds * 1000) - new Date();
    let days = Math.floor(milisecondsLeft / 1000 / 60 / 60 / 24 + 1);
    if (days < 1) {
      days = 0;
    }

    let badgeArr = challengerData.badges;
    while (badgeArr.length > 8) {
      badgeArr.pop();
    }
    let badgesLeft = 8 - badgeArr.length;

    formData.append("avatar", userData.avatar);
    formData.append("daysLeft", days);
    formData.append("badgesLeft", badgesLeft);
  }

  // emails challenger when 8 badges earned
  else if (emailType === "challengeWon") {
    formData.append("avatar", userData.avatar);
  }

  // emails for action completion
  else if (emailType === "registered" || emailType === "electionReminder") {
    // if user is a player
    if (!userData.startedChallenge) {
      const challengerData = await getChallengerDatabase();

      formData.append("firstName", challengerData.name);
      formData.append("avatar", challengerData.avatar);
    } else {
      formData.append("firstName", userData.name);
      formData.append("avatar", userData.avatar);
      formData.append("isChallenger", true);
    }
  }

  return fetch(URL, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        console.log("error", response.statusText);
        throw Error(response.statusText);
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

// challengerWelcome (SignupPage.js)
// playerWelcome (SignupPage.js)

// badgeEarned (UserData.js)
// challengeWon (UserData.js)
// registered (UserData.js)
// electionReminder (UserData.js)

// challengeIncomplete
