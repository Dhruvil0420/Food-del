import { createContext } from "react";

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
    const contextValue = {
        
    }

    return (
            <AppContext.Provider value={contextValue}>
                {props.children}
            </AppContext.Provider>
    )
}

export default AppContextProvider;
