import React, { createContext, useState } from 'react';
import decode from 'jwt-decode';

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
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
