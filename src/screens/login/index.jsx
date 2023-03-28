import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { InputRow, Button } from '../../components/index';
import axios from 'axios';
import baseURL from '../../config/config';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const [username, setUsername] = useState('john');
  const [password, setPassword] = useState('1234');
  const [company, setCompany] = useState('');
  const navigation = useNavigation();

  const handleUsername = text => setUsername(text)
  const handlePassword = text => setPassword(text)
  const handleCompany = text => setCompany(text)

  const handleLogin = async () => {
    
    await axios.post(`${baseURL}/notifyLogin.php`, {
      username: username,
      password: password,
      company: company
    }).then((response) => {
      console.log('response')
      console.log(response.data);
      if(response.data.status == 'OK') {
        navigation.navigate('HomePage', {userid: response.data.res.userid })
      }
    });



  };

  return (
    <View style={styles.container}>
      <InputRow 
        label="Company"
        onChange={handleCompany}
        value={company}
        
      />
      <InputRow 
        label="Username"
        onChange={handleUsername}
        value={username}
        
      />
      <InputRow 
        onChange={handlePassword}
        value={password}
        label="Password"
      />
      <Button onPress={handleLogin} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 3,
    width: '100%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
});

export default LoginScreen;