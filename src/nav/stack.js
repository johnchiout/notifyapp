import React, {useState, useEffect, useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Box, useColorMode, useColorModeValue, colorMode, useTheme, Switch, HStack} from 'native-base';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
//Pages:
import HomePage from '../screens/homepage';
import LoginScreen from '../screens/login';
import FindUsers from '../screens/users/findUsers';




console.log(colorMode)


//New staff here:
const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();


//Login Screen - Stack:
const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'red',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <AuthStack.Screen
      name="SignIn"
      component={LoginScreen}
      options={{ 
        title: "Sign In",
        headerShown: false,
       }}
    />
    
  </AuthStack.Navigator>
);


//Other Main Screens - Drawer:
const DrawerScreen = () => {
  const {
    colors
  } = useTheme();

  console.log(colors.primary["100"])
  const {
    colorMode,
  } = useColorMode();
  console.log(colorMode)

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      drawerActiveTintColor:  colorMode === 'dark' ? 'white' : 'black',
      drawerActiveBackgroundColor:  colorMode === 'dark' ? `${colors.primary['900']}` : `${colors.primary['400']}`,
      drawerStyle: {
        backgroundColor: colorMode === 'dark' ? `${colors.primary['500']}` : 'white',
      },
      headerTintColor:  colorMode === 'dark' ? 'white' : `${colors.primary['800']}` ,
      headerStyle: { backgroundColor:  colorMode === 'dark' ? `${colors.primary['700']}` : 'white' },
    }}
    >
      <Drawer.Screen name="Home" component={HomePage} options={{ 
        title: "Home",
        }}/>
      <Drawer.Screen name="Users" component={ FindUsers} options={{ title: "Users" }}/>
    </Drawer.Navigator>
  )
}

const CustomDrawerContent = (props) => {
  const { authActions} = useContext(AuthContext);

  const { toggleColorMode} = useColorMode();
  const onPress = async () => {
    authActions.signOut();

  }

  const onPressColorMode = async () => {
    toggleColorMode();
  }
  
  return (
    <Box>
       <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={ onPress }
      />
      <DrawerItem
        label="Color Mode"
        onPress={ onPressColorMode }
       
      />
      <HStack>
        
      </HStack>
    </Box>
  )
}


const RootStack = createStackNavigator();


//Combine Drawer and Stack:
const RootStackScreen = () => {

  const {isLogged, authActions} = useContext(AuthContext);

    useEffect(() => {
      authActions.initialize();
    }, [])

    return (
      <NavigationContainer >
        <RootStack.Navigator
          screenOptions={{ 
            headerShown: false
           }}
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
