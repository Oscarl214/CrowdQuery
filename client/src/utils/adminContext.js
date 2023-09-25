import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [usersData, setUsersData] = useState(null);

  return (
    <UserContext.Provider value={{ usersData, setUsersData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
