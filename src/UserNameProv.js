import React, { useState } from "react";

export const UserNameContext = React.createContext();

const UserNameProv = ({ children }) => {
  const [name, set] = useState("");
  return (
    <UserNameContext.Provider value={{ name, set }}>
      {children}
    </UserNameContext.Provider>
  );
};

export default UserNameProv;
