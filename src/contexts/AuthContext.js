import React, { useContext, useEffect, useState } from 'react';
import { ModalTitle } from 'react-bootstrap';
import { auth } from '../firebase';

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContext = React.createContext();;

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.getAuth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

    const value = {
        currentUser
    };
    return (
        <AuthContext.Provider value={value}>
            {!authLoading && children}
        </AuthContext.Provider>
    )
}
