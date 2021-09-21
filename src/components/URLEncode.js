export const generateURL = (/* The first param must be the UID */ ...params) => (
    `${window.location.origin}/playerwelcome?code=${btoa(`${params.join(',')}`)}`
)

export const GetUserData = async() => {
    try {
        // See the log for what data is stored in the URL
        // We can decide and change what this is at any time
        
        // Set UID to be whatever we are getting the data from
        const uid = atob(this.useQuery().get('uid')).split(',')[0];
        const db = getFirestore();
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // This can be changed from email to whatever we need to show
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