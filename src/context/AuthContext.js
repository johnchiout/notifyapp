
import React, {useState, createContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();


export const AuthLayout = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged , setIsLogged] = useState(false);



  const authActions = React.useMemo(() => {
    return {
      signIn: () => {
        console.log('sign in')
        setIsLoading(false);
        setIsLogged(true);
        asyncStoreContext.save('@isLogged', JSON.stringify(true))
      },
      
      signOut: () => {
        console.log('sign out')
        setIsLoading(false);
        setIsLogged(false);
        asyncStoreContext.save('@isLogged', JSON.stringify(false))
      }, 
      initialize: async () => {
        console.log('initialize')
        setIsLoading(true)
        let item = await asyncStoreContext.get('@isLogged');
        setIsLogged(JSON.parse(item))
      }

    };
    
  }, []);

  const asyncStoreContext = React.useMemo(() => {
    return {
      save: async (storage_key, value) => {
        try {
          return await AsyncStorage.setItem(storage_key, value)
        } catch (e) {
          console.log(e)
        }
      },
      get: async (storage_key) => {
        try {
          return await AsyncStorage.getItem(storage_key)
        } catch (e) {
          console.log(e)
        }
      }
    }
  })


  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // }, []);

  // if (isLoading) {
  //   return <Splash />;
  // }

  return (
    <AuthContext.Provider value={{isLogged, setIsLogged, authActions}}>
        {children}
    </AuthContext.Provider>
  );
};
