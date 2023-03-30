import 'react-native-gesture-handler';
import { SafeAreaView, AppRegistry} from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Box, useColorMode, useColorModeValue } from "native-base";
import StackNav from './src/nav/stack';

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  return <App />;
}


function App() {
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
AppRegistry.registerComponent('app', () => HeadlessCheck);

export default App;
