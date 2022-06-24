import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const AppContext = React.createContext();

export function AppProvider(props) {
    const location = useLocation();
    const history = useHistory();

    const [accessToken, setAccessToken] = useState(localStorage.getItem('x-access-token'));
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    const [createGameSession, setCreateGameSession] = useState(null);

    function checkLogin() {
        if (!accessToken && location.pathname !== "/login" && location.pathname !== "/register") {
            history.push("/login");
        }
    }

    function saveAccessToken(data){
        localStorage.setItem('x-access-token', data.accessToken);
        localStorage.setItem('x-refresh-token', data.refreshToken);
        localStorage.setItem('userId', data.userId);

        setAccessToken(data.accessToken);
        setUserId(data.userId);
    }

    function logout() {
        saveAccessToken({
            accessToken: '',
            refreshToken: '',
            userId: '',
        });
    }
  
  return (
        <AppContext.Provider
            value={{
                accessToken, setAccessToken,
                userId, setUserId,
                createGameSession, setCreateGameSession,
                checkLogin,
                saveAccessToken,
                logout
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}
