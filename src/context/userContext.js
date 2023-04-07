import React, {useState, createContext} from "react";

export const UserContext = createContext();

export const UserLayout = ({children}) => {
  const [user, setUser] = useState({
    password: '1234',
    username: 'giannis',
    company:  'CCM',
  })

  
  const userActions = React.useMemo(() => {
    return {
      setCompany: (text) => {
        setUser(prev => ({...prev, company: text}))
      },
      setUsername: (text) => {
        setUser(prev => ({...prev, username: text}))
      },
      setPassword: (text) => {
        setUser(prev => ({...prev, password: text}))
      },
    };
    
  }, []);


  return (
    <UserContext.Provider value={{user,userActions}}>
        {children}
    </UserContext.Provider>
  );
};
