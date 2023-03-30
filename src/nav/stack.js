import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Box, useColorModeValue, Button, toggleColorMode, useColorMode, IconButton, SunIcon, MoonIcon, Flex,} from 'native-base';
import LoginScreen from '../screens/login';
import HomePage from '../screens/homepage';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Stack = createStackNavigator();


const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}  
      options={{
         header: ({ navigation }) => (
          <NavStyle navigation={navigation} title="Login"/>
          ),
      }}
      />
      <Stack.Screen name="HomePage" component={HomePage}
        options={{
          header: ({ navigation }) => (
           <NavStyle navigation={navigation} title="Αρχική"/>
           ),
       }}
      />
    </Stack.Navigator>
  );
}


const NavStyle = ({navigation, title}) => {
  const {
    colorMode,
    toggleColorMode
  } = useColorMode();

  return (
    <Box bg={"primary.700"} w={'100%'} p={'15px'} flexDirection="row" alignItems={'center'} justifyContent={'space-between'}>
        <Text color={'light.50'}>{title}</Text>
        <Flex align="flex-end" direction="row" >
        <IconButton style={styles.toggleMode} onPress={toggleColorMode} icon={colorMode === "light" ? <MoonIcon size="sm" color="primary.900"/> : <SunIcon size="sm"color="yellow.600"/>}/>
        {/* <IconButton style={styles.toggleMode}  icon={<MaterialIcons name="logout-variant"  />}/> */}
        </Flex>
    </Box>
    
  )
}

const styles = StyleSheet.create({
    toggleMode: {
      backgroundColor: 'white',
      borderColor: 'primary.600',
      elevation: 5,
      borderRadius: 30,
      marginRight: 4,
    }
});
export default StackNav;