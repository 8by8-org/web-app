import React from 'react';
import LandingPageInfo from "./LandingPageInfo";
import { doc, getDoc, getFirestore } from "@firebase/firestore";


class PlayerWelcome extends React.Component{
    // Only these 3 functions are needed
    // Render is only to show that the data is rendered
    // Customize render to show what we need
    constructor(props) {
        super(props);
        this.state ={
            users: null
        }
    }
    generateURL = (uid, params /* Put the params you want here */) => (
        `${window.location.origin}/playerwelcome?uid=${btoa(`${uid},${params.join(',')}`)}`
    )
    useQuery = () => new URLSearchParams(this.props.location.search);
    componentDidMount() {
        this.renderUsers();
    }
    async GetUserData() {
        try {
            // See the log for what data is stored in the URL
            // We can decide and change what this is at any time
            console.log(atob(this.useQuery().get('uid')).split(','));
            const uid = atob(this.useQuery().get('uid')).split(',')[0];
            const db = getFirestore();
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log(docSnap.data());
                // This can be changed from email to whatever we need to show
                const arr = [docSnap.data().email]; 
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

    renderUsers = async () => {
        try {
            const users = await this.GetUserData();
            this.setState({
                users: users
            });
        } catch (err) {
            console.log(err);
        }
    }
      
    render() {
        const users = this.state.users;
        // A testing thing
        const url = this.generateURL('iLjxSYwS3xNlZh3dZuxMrKX3IKo2', ['9/18/2021','John Doe'])
        return (
            
            <div>
                <LandingPageInfo />
                <ul className="list-group list-group-flush">
                    {users}
                </ul>
                <p>
                    {url}
                </p>
            </div>
            
        );
    }
}

export default PlayerWelcome;