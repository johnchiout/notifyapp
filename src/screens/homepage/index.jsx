import axios from 'axios'
import { SafeAreaView, Text, Alert} from "react-native";
import { useEffect, useState } from "react";
import messaging from '@react-native-firebase/messaging';
import baseURL from '../../config/config';
import { useRoute } from '@react-navigation/native';

const HomePage = ({route}) => {
  const { userid } = route.params;
  console.log(userid)
  console.log(route.params)
  const [state, setState] = useState({
    token: ''
  });
  
  const registerToken = async (token) => {
    console.log("TOKEN " + token)
    await axios.post(`${baseURL}/notifyRegisterToken.php`, {
      userid: userid,
      token: token
    }).then((response) => {
      
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
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>HomePage</Text>
    </SafeAreaView>
  );
}


export default HomePage;
