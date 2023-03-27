import { SafeAreaView, Text, Alert} from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';


import StackNav from './src/nav/stack';



function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <StackNav />
        </NavigationContainer>
    </SafeAreaView>
  );
}


export default App;
