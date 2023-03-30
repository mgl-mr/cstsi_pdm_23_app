import React, {createContext} from 'react';

export const AthUserContext = createContext({});

export const AthUserProvider = ({children}) => {
  return (
    <AthUserContext.Provider value={{}}>{children}</AthUserContext.Provider>
  );
};
