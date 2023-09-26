import React, { createContext, useState } from 'react';

//Setting up the users Context
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
