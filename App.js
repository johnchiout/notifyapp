import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { SafeAreaView, AppRegistry} from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Box, useColorMode, useColorModeValue } from "native-base";
import {StackNav} from './src/nav/stack';
import { AuthStack, MainStack } from './src/nav/stack';
import useAsyncStorage from './src/utils/storeAsync';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'
import { MainNavigator } from './src/nav/stack';
import { FinalStackNavigator } from './src/nav/stack';
import RootStackScreen from './src/nav/stack';
import { AuthLayout } from './src/context/AuthContext';

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
  use
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
          {/* {!islogged  ? <StackNav /> : <MainStack />} */}
          {/* <  FinalStackNavigator /> */}
          <RootStackScreen />
      </SafeAreaView>
    </NativeBaseProvider>
    </AuthLayout>
   
    
  );
}

AppRegistry.registerComponent('app', () => HeadlessCheck);

export default App;
