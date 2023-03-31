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






function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  return <App />;
}


function App() {
  const [islogged, setIslogged] = useState(false)
  console.log('islogged value: ' + islogged)
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@isLogged')
      if(value !== null) {
        console.log('Login value: ' + value)
       setIslogged(JSON.parse(value))
      }
    } catch(e) {
      // error reading value
    }
  }



  useEffect(() => {
    getData()
  }, [])

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          {!islogged  ? <StackNav /> : <MainStack />}
          {/* {value ? <MainStack/> : <AuthStack />} */}
        </NavigationContainer>
      </SafeAreaView>
    </NativeBaseProvider>
    
  );
}

AppRegistry.registerComponent('app', () => HeadlessCheck);

export default App;
