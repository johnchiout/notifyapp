import axios from 'axios'
import { SafeAreaView, Alert, StyleSheet} from "react-native";
import { useEffect, useState } from "react";
import messaging from '@react-native-firebase/messaging';
import baseURL from '../../config/config';
import useAsyncStorage from '../../utils/storeAsync';
//NATIVE BASSE
import { Box, Text, Input, useColorModeValue, colorMode, HStack, Icon, Divider,  } from 'native-base';
import converTime from '../../utils/converTime';
import AntDesign from  'react-native-vector-icons/AntDesign'
import MaterialIcons from  'react-native-vector-icons/MaterialCommunityIcons'

import AsyncStorage from '@react-native-async-storage/async-storage';





const HomePage = ({route}) => {
  // const { userid } = route.params;
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      let numValue =  JSON.parse(value)
      return numValue;
       
    } catch(e) {
      // error reading value
    }
  }

  const bg = useColorModeValue("warmGray.100", "coolGray.800");
  const bgCard = useColorModeValue("white", "primary.600");
  const bgCardBorderColor =  useColorModeValue("primary.500", "primary.300");
  const [value, saveData, clearData] = useAsyncStorage('@message', 'initial value');


 

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
        setMessage(remoteMessage)
        saveData(remoteMessage)
      }
      
    });
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      if(remoteMessage) {
        setMessage(remoteMessage)
        saveData(remoteMessage)
      }
      // console.log('Notification caused app to open from background state:',remoteMessage.notification);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
      
        if (remoteMessage) {
          saveData(remoteMessage)
          setMessage(remoteMessage)
          // console.log(
          //   'Notification caused app to open from quit state:',
          //   remoteMessage.notification,
          // );
        }
      });
      onAppBootstrap()

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        if(remoteMessage) {
          saveData(remoteMessage)
          setMessage(remoteMessage)
        }
      
      });
      return unsubscribe;
  }, []);


  

  return (
    <SafeAreaView style={{flex: 1}}>
      <Box p="10px" bg={bg} flex={1}>
          <Box style={styles.cardBox} borderColor={bgCardBorderColor} bg={bgCard} >
              <HStack justifyContent="flex-start" space={3} alignItems="center" bg={bgCardBorderColor}  p={"10px"}>
                  <MaterialIcons name="message-reply-text" size={18} color={'white'} />
                 <Text
                  color={colorMode === 'dark' ? "primary.100" : 'white'}
                 >New Push Notification</Text>
              </HStack>
              <Box >
                <MessageBox message={value?.notification?.title} title={'Title:'}/>
                <Divider my={2} />
                <MessageBox message={value?.notification?.body} title={'Body:'}/>
                <Divider my={2} />
                <MessageBox message={value?.data?.inAppMessage} title={'Data:'}/>
              </Box>
           
            {/* <Box bg={"primary.400"} w="25%" style={styles.timeStamp} >
              <AntDesign name="clockcircleo" />
              <Text>{value && converTime(value?.sentTime) }</Text>
            </Box> */}
          <Box>
          </Box>
        </Box>
      </Box>
    
    </SafeAreaView>
  );
}



const MessageBox = ({message, title}) => {
  return (
    <Box w="100%" p="10px" >
      <Text fontSize="md" >{title}</Text>
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
