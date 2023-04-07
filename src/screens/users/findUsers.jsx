import React, {useContext, useEffect, useState} from 'react'
import { Box, Text, Heading, HStack, FlatList, Avatar, VStack, Spacer, Button } from 'native-base';
import { UserContext } from '../../context/userContext';
import { InputBase, BoxLayoutPlain } from '../../components';
import baseURL from '../../config/config';
import axios from 'axios';

const FindUsers = () => {
  const {user } = useContext(UserContext);
  const [data, setData] = useState([])

  const handleUsers = async () => {
    await axios.post(`${baseURL}/findUsers.php`, {
      username: user.username,
      companyName: user.company,
    }
    ).then((response) => {
        setData(response.data)
      
      }
    ).catch((error) => {
        console.log(error)
    });

  }
  
  useEffect(() => {
    handleUsers();
  }, [])

  return (
    <BoxLayoutPlain>
      <Heading fontSize="xl" mb={'10px'}>
        Registerd Users
      </Heading>
      <FlatList 
        data={data} 
        renderItem={({item
      }) => <RenderItem item={item} />}
       keyExtractor={item => item.id} />
    </BoxLayoutPlain>
  )
};


const RenderItem = ({item}) => {
  return (
   
    <VStack rounded="md" bg="primary.700">
      <VStack p={"10px"}>
        <HStack>
        <Text bold fontSize="md">Username:</Text>
        <Text fontSize="md"  marginLeft={'4px'}>{item.username}</Text>
        </HStack>
        <HStack>
        <Text bold fontSize="md">Company:</Text>
        <Text fontSize="md"  marginLeft={'4px'}>{item.companyname}</Text>
        </HStack>
      </VStack>
      <Button bordered success>
        <Text>Send Message</Text>
      </Button>
    </VStack>
  )
}


export default FindUsers