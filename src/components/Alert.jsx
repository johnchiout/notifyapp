import React, {useState} from 'react'
import { Box, VStack, HStack, Alert, IconButton, Text, CloseIcon} from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'

const CustomAlert = ({status, text, setIsClose}) => {
 
  return (
    <Box>
       <Alert w="100%" status={status}>
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1}  justifyContent="space-between" alignItems={'center'}>
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md" color="coolGray.800">
                    {text}
                  </Text>
                </HStack>
                  <IconButton onPress={() => setIsClose(true)} variant="unstyled" _focus={{
                borderWidth: 0
              }} icon={<CloseIcon size="3" />} _icon={{
                color: "coolGray.600"
              }} />
              </HStack>
            </VStack>
          </Alert>
    </Box>
  )
}

export default CustomAlert;