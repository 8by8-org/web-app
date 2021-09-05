export default function errorMessage(e) {
    switch (e.code) {
        case 'auth/invalid-email':
        case "auth/argument-error": 
        case "auth/user-not-found":
            return 'Please enter a valid email.';
        case "auth/email-already-in-use": 
            return 'An user with email already exists. Please Log In instead. ';
        default:
            return 'An unknown error occurred.'
    }
}
