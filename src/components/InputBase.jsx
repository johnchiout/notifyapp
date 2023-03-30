import React from 'react'
import { Input, Box, Text, Pressable, FormControl } from 'native-base';
import FontAws from 'react-native-vector-icons/FontAwesome'

export const InputBase = ({label, value, onChange}) => {
  return (
    <Box mb={'10px'}>
      <Text mb={'5px'} bold>{label}</Text>
      <Input size="lg" onChangeText={onChange}  value={value} w="100%"/>
    </Box>
  )
}



export const InputPassword = ({label, value, onChange}) => {
  const [show, setShow] = React.useState(false);
  return (
    <Box>
      <Text>{label}</Text>
      <Input w={'100%'} type={show ? "text" : "password"} 
          // InputRightElement={<Pressable onPress={() => setShow(!show)}>
          //   <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
          // </Pressable>} placeholder="Password" 
          />
    </Box>
  )
}

