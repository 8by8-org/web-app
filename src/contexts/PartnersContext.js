import React, {useState, useEffect, createContext, useContext} from "react";
import { getAllPartnerData } from "../functions/partnerData";
import { useAuth } from "./AuthContext";

export function usePartners() {
    return useContext(PartnersContext);
}

export const PartnersContext = createContext();

export const PartnersContextProvider = ({children}) => {
    const {currentUser} = useAuth();
    const [allPartners, setAllPartners] = useState({});
    const [partnersExist, setPartnersExist] = useState(false);

    function setPartnersAndPartnersExists(data) {
        setAllPartners(data);
        if(data && Object.keys(data).length > 0) setPartnersExist(true);
        else setPartnersExist(false);
    }

    //this should also fire on auth state change
    useEffect(() => {
        getAllPartnerData(setPartnersAndPartnersExists);
    }, []);

    useEffect(() => {
        getAllPartnerData(setPartnersAndPartnersExists);
    }, [currentUser]);

    return (
        <PartnersContext.Provider value={{allPartners, partnersExist}}>{children}</PartnersContext.Provider>
    )
}