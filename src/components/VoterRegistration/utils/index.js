import { DateTime } from "luxon";

export const getAge = (dob) => {
  const dateOfBirth = new DateTime.fromISO(dob);
  const today = new DateTime.now();
  const age = today.diff(dateOfBirth, "years").toObject().years;
  return age;
};

export const getEligibility = (dob, state) => {
  const dateOfBirth = new DateTime.fromISO(dob);

  const today = new DateTime.now();
  const age = today.diff(dateOfBirth, "years").toObject().years;

  if (age >= 18)
    return {
      eligibility: "eligible",
      message: "",
    };

  const MIN_AGE_16_STATES = [
    "CA",
    "CO",
    "DC",
    "DE",
    "FL",
    "HI",
    "LA",
    "MD",
    "MA",
    "NY",
    "NC",
    "OR",
    "RI",
    "UT",
    "VA",
    "WA",
  ];
  const MIN_AGE_17_STATES = ["ME", "NV", "NJ", "WV"];
  const MIN_AGE_17_5_STATES = ["GA", "IA", "MO"];

  if (MIN_AGE_16_STATES.includes(state)) {
    if (age >= 16) {
      return {
        eligibility: "preregister",
        message: `Your state (${state}) permits preregistration beginning at age 16. Please note that you must be 18 at the time of the next election to vote.`,
      };
    } else {
      return {
        eligibility: "underage",
        message: `The minimum preregistration age is 16 in your state (${state}).`,
      };
    }
  }
  if (MIN_AGE_17_STATES.includes(state)) {
    if (age >= 17) {
      return {
        eligibility: "preregister",
        message: `Your state (${state}) permits preregistration beginning at age 17. Please note that you must be 18 at the time of the next election to vote.`,
      };
    } else {
      return {
        eligibility: "underage",
        message: `The minimum preregistration age in your state (${state}) is 17.`,
      };
    }
  }
  if (MIN_AGE_17_5_STATES.includes(state)) {
    if (age >= 17.5) {
      return {
        eligibility: "preregister",
        message: `Your state (${state}) permits preregistration beginning at age 17.5. Please note that you must be 18 at the time of the next election to vote.`,
      };
    } else {
      return {
        eligibility: "underage",
        message: `The minimum preregistration age in your state (${state}) is 17.5.`,
      };
    }
  }
  if (state === "AK" || state === "TX") {
    const birthMonth = dateOfBirth.month;
    const birthday = dateOfBirth.day;
    const thisYear = today.year;
    let bday = new DateTime.fromObject({
      year: thisYear,
      month: birthMonth,
      day: birthday,
    });
    //check to make sure that the user's birthday hasn't already passed
    if (bday < today) {
      bday.plus({ years: 1 }); //if the user's birthday in the current year has passed, increment the year
    }
    if (state === "AK") {
      //check if the user is 17 older, and if they are determine if the days remaining before their 18th birthday are 90 or less as per Alaska's regulations
      if (age > 17) {
        const difference = bday.diff(today, "day").toObject().days;
        if (difference <= 90) {
          return {
            eligibility: "preregister",
            message: `Your state (${state}) permits preregistration within 90 days of your 18th birthday. Please note that you must be 18 at the time of the next election to vote.`,
          };
        } else {
          return {
            eligibility: "underage",
            message:
              "You must be within 90 days of turning 18 to preregister to vote in Alaska.",
          };
        }
      } else {
        return {
          eligibility: "underage",
          message:
            "You must be within 90 days of turning 18 to preregister to vote in Alaska.",
        };
      }
    }
    //if the user is from texas
    else {
      //check if the user is older than 17
      if (age > 17) {
        //if they are, check that they are 17 years and 10 months or older, per Texas law
        const difference = bday.diff(today, "months").toObject().months;
        if (difference <= 2) {
          return {
            eligibility: "preregister",
            message: `Your state (${state}) permits preregistration beginning at age 17 and 10 months. Please note that you must be 18 at the time of the next election to vote.`,
          };
        } else {
          return {
            eligibility: "underage",
            message:
              "You must be 17 and 10 months of age or older to preregister to vote in Texas.",
          };
        }
      } else {
        return {
          eligibility: "underage",
          message:
            "You must be 17 and 10 months of age or older to preregister to vote in Texas.",
        };
      }
    }
  }
  //case for all other states except ND which does not require registration
  return {
    eligibility: "underage",
    message:
      "Your state does not specifically address an age for preregistration. You may register if you will be 18 by the next election. Please reach out to your state election officials for details.",
  };
  // if(state === "ND") {
  // ND residents do not need to register to vote, however this may simply be handled at the end by not redirecting them to their state website
  // }
};
