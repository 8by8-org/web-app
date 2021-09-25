/* The generate URL function - call this and it will return an URL with the encoded paramters */
/* Use as many paramters as you want, but the first parameter MUST be the users UID (this can be changed in the future) */


export const generateURL = (...params) => (
    // Change '/playerwelcome' to whatever route recieves this URL
    `${window.location.origin}/playerwelcome?code=${btoa(`${params.join(',')}`)}`
)

/* Function that gets the user data */
/* URL is the query param in the URL that has a code generated from the above function */
/* Returns an array with the user data*/

export const getUserData = async ( url ) => {
    try {
        // The first paramter is the UID - it retrieved from the user query
        // This is gettings the user from that
        const uid = atob(url)[0];
        const db = getFirestore();
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
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