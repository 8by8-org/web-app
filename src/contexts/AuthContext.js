
   
import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.getAuth().onAuthStateChanged(user => {
            setCurrentUser(user);
            setAuthLoading(false);
        });
        return unsubscribe;
    }, [])

    const value = {
        currentUser
    };
    return (
        <AuthContext.Provider value={value}>
            {!authLoading && children}
        </AuthContext.Provider>
    )
}