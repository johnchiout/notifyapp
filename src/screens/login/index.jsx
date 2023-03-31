import React, { useState, useEffect } from 'react';
import { InputRow, InputBase, BoxLayout, InputPassword, CustomAlert, InputControl } from '../../components/index';
import axios from 'axios';
import baseURL from '../../config/config';
import { useNavigation } from '@react-navigation/native';
import { Button, useColorMode, useColorModeValue, Box, Text, Container, VStack, Toast} from "native-base";
import { useToast } from 'native-base';
import useAsyncStorage from '../../utils/storeAsync';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
    console.log('saving error')
  }
}




const LoginScreen = () => {
  
  const [value, saveData, clearMyData] = useAsyncStorage('@isLogged', 'initial value');

  const [state, setState] = useState({
    username: '',
    password: '',
    company: '',
    isLoading: false,
    isDisabled: false,
  })

  const [isClose, setIsClose] = useState(true)
  const navigation = useNavigation();
  const handleUsername = text =>setState(prev => ({...prev, username: text}))
  const handlePassword = text =>setState(prev => ({...prev, password: text}))
  const handleCompany = text =>setState(prev => ({...prev, company: text}))
   
  useEffect(() => {
    if(state.username === "" || state.password === "" || state.company === "" ) {
      setState(prev => ({...prev, isDisabled: true}))
    }
    if(state.username && state.password && state.company ) {
      setState(prev => ({...prev, isDisabled: false}))
    }

    
  }, [state.username, state.password, state.company])

  const handleLogin = async () => {
    setState(prev => ({ ...prev, isLoading: true}));
    

    await axios.post(`${baseURL}/notifyLogin.php`, {
      username: state.username,
      password: state.password,
      company: state.company
    }).then((response) => {
    
      if(response.data.status == 'OK') {
      
        setState(prev => ({...prev, isLoading: false}))
        storeData('@isLogged', JSON.stringify(true))
        storeData('@userID', JSON.stringify(response.data.res.userid))
        navigation.navigate('HomePage', {userid: response.data.res.userid })
          
      }
      console.log(response.data);
      if(response.data.status == 'NOT OK') {

        setState(prev => ({...prev, isLoading: false}))
        setIsClose(false)
      }
    });



  };

  return (
      <BoxLayout>
          {!isClose && <CustomAlert status={'error'} text={'Wrong credentials, please try again'} setIsClose={setIsClose}/>}
          <InputBase 
          label="Company"
          onChange={handleCompany}
          value={state.company}
          />
          <InputBase 
          label="Username"
          onChange={handleUsername}
          value={state.username}
          />
      
          <InputBase 
          label="Password"
          onChange={handlePassword}
          value={state.password}
          />
        
          <Button
            w="100%"
            size={'lg'}
            m={'10px 0px'}
            onPress={handleLogin}
            isLoading={state.isLoading}
            isDisabled={state.isDisabled}
          >
            Login
          </Button>
       
        {/* <Button w="100%" onPress={toggleColorMode}  fontSize="lg">
            Toggle
        </Button>
        <Text>Color</Text> */}
      </BoxLayout>
      
      // </Box>
  );
};



export default LoginScreen;