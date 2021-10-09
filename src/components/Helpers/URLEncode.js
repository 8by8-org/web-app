/* The generate URL function - call this and it will return an URL with the encoded paramters */
/* Use as many paramters as you want, but the first parameter MUST be the users UID (this can be changed in the future) */

import * as auth from 'firebase/firestore';

export const generateURL = (...params) => (
    // Change '/playerwelcome' to whatever route recieves this URL
    `${window.location.origin}/playerwelcome?code=${btoa(`${params.join(',')}`)}`
)

/* Function that gets the user data */
/* URL is the query param in the URL that has a code generated from the above function */
/* Returns an array with the user data*/

export const getUrlData = ( urlCode ) => {
    return atob(urlCode).split(',');
}

export const getUserData = async ( urlCode ) => {
    try {
        // The first paramter is the UID - it retrieved from the user query
        // This is gettings the user from that
        const uid = atob(urlCode)[0];
        const db = auth.getFirestore();
        const docRef = auth.doc(db, 'users', uid);
        const docSnap = await auth.getDoc(docRef);
        if (docSnap.exists()) {
            const arr = [docSnap.data()]; 
            return arr;
        } else {
            return ("No such document!");
        }
    } 
    catch (e) {
        console.log('error!: ', e);
        return 'error';
    }
}