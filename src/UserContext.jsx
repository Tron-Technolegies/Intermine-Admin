import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [selectedMiner, setSelectedMiner] = useState(null);
  return (
    <UserContext.Provider
      value={{ user, setUser, selectedMiner, setSelectedMiner }}
    >
      {children}
    </UserContext.Provider>
  );
}
