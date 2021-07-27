export default function errorMessage(e) {
    switch (e.code) {
        case 'auth/invalid-email':
            return 'Please enter a valid email.';
        default:
            return 'An unknown error occurred.'
    }
}
