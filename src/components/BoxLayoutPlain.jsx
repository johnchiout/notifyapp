import React from 'react';
import { Box, useColorMode, useColorModeValue } from 'native-base';


const BoxLayout = ({children}) => {
  // const {colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("warmGray.50", "coolGray.800");
  return (
    <Box bg={bg} w={'100%'} p={'15px'} flex={1} >
      {children}
    </Box>
  )
}

export default BoxLayout