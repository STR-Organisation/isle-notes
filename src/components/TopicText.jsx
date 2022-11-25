import React from 'react';
import { Text } from '@chakra-ui/react';

export default function TopicText({ textValue, onClick }) {
  return (
    <Text
      cursor={'pointer'}
      fontSize={'lg'}
      color="black"
      fontWeight={'semibold'}
      mx="4"
      p={4}
      mt={4}
      _hover={{
        bg: 'tomato',
        color: 'white',
      }}
      borderRadius="lg"
      onClick={() => {
        onClick(textValue);
      }}
    >
      {textValue}
    </Text>
  );
}
