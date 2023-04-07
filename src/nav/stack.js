import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Box, useColorModeValue, Button, toggleColorMode, useColorMode, IconButton, SunIcon, MoonIcon, Flex, Icon} from 'native-base';


import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { AuthContext } from '../context/AuthContext';
//Pages:
import HomePage from '../screens/homepage';
import LoginScreen from '../screens/login';
import FindUsers from '../screens/users/findUsers';


const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
    console.log('saving error')
  }
}






//New staff here:
const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();


//Login Screen - Stack:
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={LoginScreen}
      options={{ title: "Sign In" }}
    />
    
  </AuthStack.Navigator>
);


//Other Main Screens - Drawer:
const DrawerScreen = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={HomePage} options={{ title: "Home" }}/>
    <Drawer.Screen name="Users" component={ FindUsers} options={{ title: "Users" }}/>
  </Drawer.Navigator>
);

const CustomDrawerContent = (props) => {
  const { authContext} = useContext(AuthContext);

  const onPress = async () => {
    authContext.signOut();
    await storeData('@isLogged', JSON.stringify(false));

  }
  
  return (
    <Box>
       <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={ onPress }
      />
    </Box>
  )
}


const RootStack = createStackNavigator();


//Combine Drawer and Stack:
const RootStackScreen = () => {

  const {isLogged, authContext, setIsLogged} = useContext(AuthContext);
    console.log('isLogged', isLogged) 
    const getItemAsync = async () => {
    
    let item = await AsyncStorage.getItem('@isLogged');
    setIsLogged(JSON.parse(item))
    
    }
    useEffect(() => {
      getItemAsync() 
    }, [])

    return (
      <NavigationContainer >
        <RootStack.Navigator
          screenOptions={{ headerShown: false }}
        >
          {isLogged ? (
            <RootStack.Screen
              name="App"
              component={DrawerScreen}
              options={{
                animationEnabled: false
              }}
            />
          ) : (
            <RootStack.Screen
              name="Auth"
              component={AuthStackScreen}
              // options={{
              //   animationEnabled: false
              // }}
            />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
   
    )
}

export default RootStackScreen;
