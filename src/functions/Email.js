const URL = "https://usvotes-3ulcxuufea-uw.a.run.app/email/";

const stopEmail = true; // make false when testing emails

export function emailUser(email, emailType) {
  let formData = new FormData();
  formData.append("email", email);
  formData.append("type", emailType);

  if (stopEmail) {
    console.log("no email sent to prevent reaching daily limit while testing");
    return;
  }

  return fetch(URL, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        console.log("error");
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

// challengerWelcome
// badgeEarned
// challengeWon
// challengeIncomplete
// playerWelcome
// registered
// electionReminder
