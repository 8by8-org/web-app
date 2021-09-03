export default function errorMessage(e) {
    switch (e.code) {
        case 'auth/invalid-email':
            return 'Please enter a valid email.';
        case 'email-match':
            return 'Emails do not match. Please re-enter your email.'
        default:
            return 'An unknown error occurred.'
    }
}
