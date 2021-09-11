import React from 'react';
import LandingPageInfo from "./LandingPageInfo";
import { doc, getDoc, getFirestore } from "@firebase/firestore";



class PlayerWelcome extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
            users: null
        }
    }
    useQuery() {
        return new URLSearchParams(this.props.location.search);
    }
    componentDidMount() {
        this.renderusers();
    }
    async GetUserData() {
        try {
            const uid = this.useQuery().get('userId');
            const db = getFirestore();
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log(docSnap.data());
                const arr = [docSnap.data().email]
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
    renderusers = async() => {
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
        return (
            
            <div>
                <LandingPageInfo />
                <ul className="list-group list-group-flush">
                    {users}
                </ul>
            </div>
        );
    }
}

export default PlayerWelcome;