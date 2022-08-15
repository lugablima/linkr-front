import { createContext, useContext, useState, useEffect } from "react";

function getLocalUser() {
  const localUser = JSON.parse(localStorage.getItem("user"));
  return localUser;
}

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(getLocalUser());
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
