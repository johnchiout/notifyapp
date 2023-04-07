import React, { useState, useEffect } from 'react';
import {  InputBase, BoxLayout, CustomAlert} from '../../components/index';
import axios from 'axios';
import baseURL from '../../config/config';
import { Button} from "native-base";
import useAsyncStorage from '../../utils/storeAsync';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';



const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
    console.log('saving error')
  }
}




const LoginScreen = () => {
  const {authActions} = React.useContext(AuthContext);

  const [state, setState] = useState({
    username: 'giannis',
    password: '1234',
    company: 'CCM',
    isLoading: false,
    isDisabled: false,
  })

  const [isClose, setIsClose] = useState(true)
  const handleUsername = text =>setState(prev => ({...prev, username: text}))
  const handlePassword = text =>setState(prev => ({...prev, password: text}))
  const handleCompany = text =>setState(prev => ({...prev, company: text}))
   
  useEffect(() => {
    if(state.username === "" && state.password === ""  && state.company === "" ) {
      setState(prev => ({...prev, isDisabled: true}))
    }
   

    
  }, [state.username, state.password, state.company])

  const handleLogin = async () => {
    setState(prev => ({ ...prev, isLoading: true}));
    

    await axios.post(`${baseURL}/notifyLogin.php`, {
      username: state.username,
      password: state.password,
      company: state.company
    }
    ).then((response) => {
 
      if(response.data.status == 'OK') {
      
        setState(prev => ({...prev, isLoading: false}))
        authActions.signIn();
        // storeData('@isLogged', JSON.stringify(true))
        storeData('@userID', JSON.stringify(response.data.res.userid))
          
      }
      if(response.data.status == 'NOT OK') {

        setState(prev => ({...prev, isLoading: false}))
        setIsClose(false)
      }
    }).catch((error) => {
        setState(prev => ({...prev, isLoading: false}))
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
    
      </BoxLayout>
      
  );
};



export default LoginScreen;