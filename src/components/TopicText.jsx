import React from 'react';
import { Text } from '@chakra-ui/react';

export default function TopicText({ children }) {
  return (
    <Text
      cursor={'pointer'}
      fontSize={'lg'}
      color="white"
      fontWeight={'semibold'}
      mt={2}
    >
      {children}
    </Text>
  );
}
