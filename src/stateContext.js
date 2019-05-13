import React from "react";

const stateContext = React.createContext({
  searchTerm: "",
  setSearchTerm: null
});

export const StateProvider = stateContext.Provider;
export const StateConsumer = stateContext.Consumer;
