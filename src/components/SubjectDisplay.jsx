import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function SubjectDisplay({ title, image, to, ...props }) {
  return (
    <>
      <RouterLink to={to}>
        <Flex
          bgImage={image}
          bgPosition="center"
          w="xs"
          height={'2xs'}
          backgroundSize="cover"
          backgroundRepeat={'no-repeat'}
          m={5}
          borderRadius={{ base: '2vw', lg: '1vw' }}
          align="flex-end"
          cursor={'pointer'}
          _hover={{
            transform: 'scale(1.05)',
          }}
          transition="all 200ms ease"
          {...props}
        >
          <Flex
            bg={
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'
            }
            borderRadius={{ base: '2vw', lg: '1vw' }}
            w={'100%'}
            h={'40'}
            align="flex-end"
          >
            <Heading mb={4} ml={4} color={'white'} fontSize="x-large">
              {title}
            </Heading>
          </Flex>
        </Flex>
      </RouterLink>
    </>
  );
}
