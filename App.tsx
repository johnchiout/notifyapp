import axios from 'axios'
import { SafeAreaView, Text } from "react-native";
import { useEffect, useState } from "react";
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const baseUrl = 'https://ccmde1.cloudon.gr/notifyApp';





function App(): JSX.Element {
  const [state, setState] = useState({
    token: ''
  });
  
  const registerToken = async (token: string) => {
    console.log("TOKEN " + token)
    await axios.post(`${baseUrl}/notifyRegisterToken.php`, {
      query: "insert",
      userID: "4238",
      token: token
    }).then((response) => {
      console.log('response')
      console.log(response.data);
    });
  }
  

 


  async function onAppBootstrap() {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token)
    registerToken(token)
  }


  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    console.log('start')
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(remoteMessage)
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
      onAppBootstrap()
  }, []);

 useEffect(() => {

 })
  return (
    <SafeAreaView>
        <Text>Notify</Text>
    </SafeAreaView>
  );
}


export default App;
