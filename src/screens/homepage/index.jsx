import axios from 'axios'
import { SafeAreaView, Alert, StyleSheet} from "react-native";
import { useEffect, useState } from "react";
import messaging from '@react-native-firebase/messaging';
import baseURL from '../../config/config';
import { useRoute } from '@react-navigation/native';
import { BoxLayout } from '../../components';
//NATIVE BASSE
import { Box, Text, Input, useColorModeValue, colorMode, } from 'native-base';
import converTime from '../../utils/converTime';
import AntDesign from  'react-native-vector-icons/AntDesign'

const HomePage = ({route}) => {
  const { userid } = route.params;
  const [message, setMessage ] = useState('')
  // const bg = useColorModeValue("warmGray.50", "coolGray.800");
  const bg = useColorModeValue("warmGray.100", "coolGray.800");
  const bgCard = useColorModeValue("white", "primary.600");
  const bgCardBorderColor =  useColorModeValue("primary.500", "primary.300");
  
  
  const registerToken = async (token) => {
    // console.log("TOKEN " + token)
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
    // console.log(token)
    registerToken(token)
  }


  useEffect(() => {
    

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      setMessage(remoteMessage)
    });
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      setMessage(remoteMessage)
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        setMessage(remoteMessage)
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
      onAppBootstrap()

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        console.log(remoteMessage)
        console.log(remoteMessage.data)
        console.log(remoteMessage.sentTime)

        converTime(remoteMessage.sentTime)
        setMessage(remoteMessage)
      });
      return unsubscribe;
  }, []);


  

  return (
    <SafeAreaView style={{flex: 1}}>
      <Box p="10px" bg={bg} flex={1}>
        {message && (
          <Box style={styles.cardBox} borderColor={bgCardBorderColor} bg={bgCard}  >
          <MessageBox message={message?.notification?.title} title={'Title:'}/>
          <MessageBox message={message?.notification?.body} title={'Body:'}/>
          <MessageBox message={message?.data?.inAppMessage} title={'Data:'}/>
          <Box bg={"primary.400"} w="25%" style={styles.timeStamp} >
            <AntDesign name="clockcircleo" />
            <Text>{message && converTime(message?.sentTime) }</Text>
          </Box>
          <Box>
          </Box>
        </Box>
        )}
      </Box>
    </SafeAreaView>
  );
}



const MessageBox = ({message, title}) => {
  return (
    <Box w="100%">
      <Text mt="10px" fontSize={'lg'}> {title}</Text>
      <Box w={'20px'} mb={'5px'} mt={'2px'} h={'3px'} bg={colorMode === 'dark' ? 'primary.400' : 'primary.400'}></Box>
      <Box w="100%"  bg={'warmGrey.100'}>
        <Text>
          {message}
        </Text>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  cardBox: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  timeStamp: {  
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    marginTop: 10,
  }
});

export default HomePage;
