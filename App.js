import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { SafeAreaView, AppRegistry} from "react-native";
import { NativeBaseProvider } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'
import RootStackScreen from './src/nav/stack';
import { AuthLayout } from './src/context/AuthContext';
// import { colorModeManager } from './src/utils/colorManager';


const colorModeManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value) => {
    try {
      await AsyncStorage.setItem('@color-mode', value);
    } catch (e) {
      console.log(e);
    }
  },
};


function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  return <App />;
}


function App() {
  const [islogged, setIslogged] = useState(false)

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@isLogged')
      if(value !== null) {
       setIslogged(JSON.parse(value))
      }
    } catch(e) {
      // error reading value
    }
  }


  useEffect(() => {
    getData()
     //hides the splash screen on app load.
  }, [])
  useEffect(() => {
    SplashScreen.hide();
     //hides the splash screen on app load.
  }, [islogged])

  return (
    <AuthLayout>
       <NativeBaseProvider colorModeManager={colorModeManager}>
      <SafeAreaView style={{flex: 1}}>
          <RootStackScreen />
      </SafeAreaView>
    </NativeBaseProvider>
    </AuthLayout>
   
    
  );
}

AppRegistry.registerComponent('app', () => HeadlessCheck);

export default App;
