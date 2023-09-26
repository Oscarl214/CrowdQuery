import React, { createContext, useState } from 'react';
import decode from 'jwt-decode';

//Creating a Auth context so I can use my auth logic as I need in my
//components
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('id_token'),
    user: null,
  });

  const login = (idToken) => {
    localStorage.setItem('id_token', idToken);
    setAuthState({
      ...authState,
      token: idToken,
      user: decode(idToken),
    });
  };

  const logout = () => {
    localStorage.removeItem('id_token');
    setAuthState({
      ...authState,
      token: null,
      user: null,
    });
  };

  //Pass in my functions so I can use them as I need to
  const loggedIn = () => {
    const token = localStorage.getItem('id_token');
    return !!token; // Adjust this logic according to your requirements
  };
  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
        loggedIn,
      }}
    >
      {children}{' '}
      {/** The rest of my application will have access to the auth functions */}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
