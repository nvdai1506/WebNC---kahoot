import React, { useState } from "react";

export const AppContext = React.createContext();

export function AppProvider(props) {
  const [accessToken, setAccessToken] = useState('')

  
  return (
    <AppContext.Provider
      value={{
        accessToken, setAccessToken
 
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}