
import React, {useState, createContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();


export const AuthLayout = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged , setIsLogged] = useState(false);

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        console.log('sign in')
        setIsLoading(false);
        setIsLogged(true);
      },
      signUp: () => {
        setIsLoading(false);
      },
      signOut: () => {
        console.log('sign out')
        setIsLoading(false);
        setIsLogged(false);
      }
    };
    
  }, []);

  const asyncStoreContext = React.useMemo(() => {
    return {
      save: async ({storage_key, value}) => {
        try {
          await AsyncStorage.setItem(storage_key, value)
        } catch (e) {
          console.log(e)
        }
      },
      get: async ({storage_key, value}) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(storage_key, jsonValue)
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
    <AuthContext.Provider value={{isLogged, setIsLogged, authContext}}>
        {children}
    </AuthContext.Provider>
  );
};
