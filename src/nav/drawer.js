import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from './stack';
const Drawer = createDrawerNavigator();




export const DrawerNav = () => {
 return (
      <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={MainStack} />
      </Drawer.Navigator>
 )
}



