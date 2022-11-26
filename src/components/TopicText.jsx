import React from 'react';
import { Text } from '@chakra-ui/react';

export default function TopicText({ textValue, onClick, highlighted }) {
  return (
    <>
      {highlighted ? (
        <Text
          cursor={'pointer'}
          fontSize={'lg'}
          color="black"
          fontWeight={'semibold'}
          mx="4"
          w="100%"
          p={4}
          borderLeft="4px"
          borderColor="messenger.500"
          onClick={() => {
            console.log(highlighted);
            onClick(textValue);
          }}
          textAlign="center"
        >
          {textValue}
        </Text>
      ) : (
        <Text
          cursor={'pointer'}
          fontSize={'lg'}
          color="black"
          fontWeight={'semibold'}
          mx="4"
          w="100%"
          p={4}
          _hover={{
            bg: 'gray.100',
          }}
          onClick={() => {
            console.log(highlighted);
            onClick(textValue);
          }}
          textAlign="center"
        >
          {textValue}
        </Text>
      )}
    </>
  );
}
