import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

export default function SubjectDisplay({ title, image }) {
  return (
    <>
      <Flex
        bgImage={image}
        bgPosition="center"
        w="sm"
        height={'2xs'}
        backgroundSize="cover"
        backgroundRepeat={'no-repeat'}
        m={5}
        borderRadius={'2vw'}
        align="flex-end"
        cursor={'pointer'}
      >
        <Flex
          bg={
            'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'
          }
          w={'100%'}
          h={'40'}
          align="flex-end"
          borderRadius={'2vw'}
        >
          <Heading mb={4} ml={4} color={'white'}>
            {title}
          </Heading>
        </Flex>
      </Flex>
    </>
  );
}
