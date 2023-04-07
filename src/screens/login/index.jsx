import React, { useState, useEffect } from 'react';
import {  InputBase, BoxLayout, CustomAlert} from '../../components/index';
import axios from 'axios';
import baseURL from '../../config/config';
import { Button} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/userContext';


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
  const {user, userActions} = React.useContext(UserContext);
  const [state, setState] = useState({
    isLoading: false,
    isDisabled: false,
  })


  const [isClose, setIsClose] = useState(true)
 
   
  useEffect(() => {
    if(user.username === "" && user.password === ""  && user.company === "" ) {
      setState(prev => ({...prev, isDisabled: true}))
    }
   

    
  }, [user.username, user.password, user.company])

  const handleLogin = async () => {
    setState(prev => ({ ...prev, isLoading: true}));
    

    await axios.post(`${baseURL}/notifyLogin.php`, {
      username: user.username,
      password: user.password,
      company: user.company
    }
    ).then((response) => {
 
      if(response.data.status == 'OK') {
        console.log(response.data)
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
          // onChange={handleCompany}
          onChange={userActions.setCompany}
          value={user.company}
          />
          <InputBase 
          label="Username"
          onChange={userActions.setUsername}
          value={user.username}
          />
      
          <InputBase 
          label="Password"
          onChange={userActions.setPassword}
          value={user.password}
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