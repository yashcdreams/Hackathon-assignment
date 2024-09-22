// TabContext.js
import React, { createContext, useState } from "react";

export const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
  };

  return (
    <TabContext.Provider value={{ activeTab, handleTabClick }}>
      {children}
    </TabContext.Provider>
  );
};
