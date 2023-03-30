import 'react-native-gesture-handler';
import { SafeAreaView, Text, Alert} from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Box, useColorMode, useColorModeValue } from "native-base";
import StackNav from './src/nav/stack';



function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <StackNav />
        </NavigationContainer>
      </SafeAreaView>
    </NativeBaseProvider>
    
  );
}


export default App;
