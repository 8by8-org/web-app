export default function errorMessage(e) {
  switch (e.code) {
    case "auth/invalid-email":
      return "Please enter a correct email address.";
    case "auth/argument-error":
    case "auth/user-not-found":
      return "User not found, sign up instead?";
    case "auth/email-already-in-use":
      return "This email is already in use.";
    default:
      return "Something went wrong. Please try again.";
  }
}
