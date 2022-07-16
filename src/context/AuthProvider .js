import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, set_Auth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, set_Auth }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
