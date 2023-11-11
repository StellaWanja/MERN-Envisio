import { createContext, useReducer } from "react";

export const AppContext = createContext();

function reducer(appstate, action) {
    // create a copy of your state
    let stateCopy = { ...appstate };

    // set the name on our state copy to action
    stateCopy.action = action;

    // if action.type is LOGIN
    // set isUserLoggedIn to true
    // & set userData to payload

    if (action.type === "LOGIN") {
        stateCopy.isUserLoggedIn = true;
        stateCopy.userData = action.payload;
    }

    if (action.type === "VIEW_PATIENT"){
        stateCopy.currentPatient = action.payload;
    }

    
    if (action.type === "PATIENT_LIST"){
        stateCopy.patientList = action.payload;
    }

    if( action.type === "ADD_RESULT"){
        stateCopy.testResult = action.payload;
    }

    // if action.type is LOGOUT
    // set isUserLoggedIn to false
    // & set userData to null

    if (action.type === "LOGOUT") {
        stateCopy.patientList = [];
        stateCopy.currentPatient = {};
        stateCopy.isUserLoggedIn = false;
        stateCopy.userData = null;
    }

    return stateCopy;
}

const initialState = {
    patientList: [],
    currentPatient: {},
    isUserLoggedIn: false,
    testResult: "",
    userData: null,
};

// eslint-disable-next-line react/prop-types
export default function StateProvider({ children }) {
    const [appstate, dispatch] = useReducer(reducer, initialState);

    const contextObject = {
        state: appstate,
        dispatch: dispatch,
    };

    return (
        <AppContext.Provider value={contextObject}>{children}</AppContext.Provider>
    );
}
