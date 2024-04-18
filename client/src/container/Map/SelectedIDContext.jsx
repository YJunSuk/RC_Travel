import { useContext, useState, createContext } from "react";

const SelectedIDContext = createContext(null);

export const SelectedIDProvider = ({ children }) => {
  const [selectedID, setSelectedID] = useState(null);

  return (
    <SelectedIDContext.Provider value={{ selectedID, setSelectedID }}>
      {children}
    </SelectedIDContext.Provider>
  );
};

export const useSelectedID = () => {
  return useContext(SelectedIDContext);
};