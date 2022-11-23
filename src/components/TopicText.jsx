import React from 'react';
import { Text } from '@chakra-ui/react';

export default function TopicText({ children }) {
  return (
    <Text
      cursor={'pointer'}
      fontSize={'lg'}
      color="black"
      fontWeight={'semibold'}
      mt={4}
      paddingBlock="4"
      paddingLeft={4}
      paddingRight={4}
      _hover={{
        bg: 'tomato',
        color: 'white',
      }}
      borderRadius="lg"
    >
      {children}
    </Text>
  );
}
