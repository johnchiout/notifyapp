import axios from 'axios'
import { SafeAreaView, Alert, StyleSheet} from "react-native";
import { useEffect, useState } from "react";
import messaging from '@react-native-firebase/messaging';
import baseURL from '../../config/config';
import useAsyncStorage from '../../utils/storeAsync';
//NATIVE BASSE
import { Box, Text, Input, useColorModeValue, useColorMode, HStack, Icon, Divider, Center } from 'native-base';

import MaterialIcons from  'react-native-vector-icons/MaterialCommunityIcons'

import AsyncStorage from '@react-native-async-storage/async-storage';




const HomePage = ({route}) => {
  // const { userid } = route.params;
  
const bg = useColorModeValue("warmGray.100", "coolGray.800");
let bgCard = useColorModeValue("white", "primary.600");
let bgCardBorderColor =  useColorModeValue("primary.500", "primary.300");


  const [value, saveData, clearData] = useAsyncStorage('@message', null);

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      let numValue =  JSON.parse(value)
      return numValue;
       
    } catch(e) {
      // error reading value
    }
  }



 

  const registerToken = async (token) => {
    let userid = await getData('@userID')
   
    await axios.post(`${baseURL}/notifyRegisterToken.php`, {
      userid:  userid ,
      token: token
    }).then((response) => {
    });
  }
  


  async function onAppBootstrap() {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    registerToken(token)
  }


  useEffect(() => {
    
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      if(remoteMessage) {
        saveData(remoteMessage)
      }
      
    });
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      if(remoteMessage) {
        saveData(remoteMessage)
      }
      // console.log('Notification caused app to open from background state:',remoteMessage.notification);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
      
        if (remoteMessage) {
          setMessage(remoteMessage)
         
        }
      });
      onAppBootstrap()

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        if(remoteMessage) {
          saveData(remoteMessage)
        }
      
      });
      return unsubscribe;
  }, []);


  

  return (
    <SafeAreaView style={{flex: 1}}>
      <Box p="10px" bg={bg} flex={1}>
        {console.log(value)}
        {value ? (
          <MessageBox value={value} />
        ): (
          <Center>
              <Text>No push notifications</Text>
          </Center>
        
        )}
      </Box>
    
    </SafeAreaView>
  );
}





const MessageBox = ({value}) => {
  let bgCard = useColorModeValue("white", "primary.600");
  let bgCardBorderColor =  useColorModeValue("primary.500", "primary.300");
 
  return (
    <Box style={styles.cardBox} borderColor={bgCardBorderColor} bg={bgCard} >
      <HStack justifyContent="flex-start" space={3} alignItems="center" bg={bgCardBorderColor} p={"10px"}>
        <MaterialIcons name="message-reply-text" size={18} color={'white'} />
        <Text>New Push Notification</Text>
      </HStack>
      <Box >
        <MessageRow message={value?.notification?.title} title={'Title:'} />
        <Divider my={2} />
        <MessageRow message={value?.notification?.body} title={'Body:'} />
        <Divider my={2} />
        <MessageRow message={value?.data?.inAppMessage} title={'Data:'} />
      </Box>
      <Box>
      </Box>
    </Box>
  )
}


const MessageRow = ({message, title}) => {
  const {
    colorMode,
  } = useColorMode();
  return (
    <Box w="100%" p="10px" >
      <Text fontSize="md" >{title}</Text>
      <Box w={'14px'} mb={'5px'} mt={'2px'} h={'2px'} bg={colorMode === 'dark' ? 'primary.400' : 'primary.600'}></Box>
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
    // padding: 10,
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
