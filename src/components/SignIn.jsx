import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { signInWithGoogle } from '../firebase-config';
import { signUpImage } from '../utils';

export default function SignIn() {
  return (
    <>
      <Flex
        width={'100%'}
        justify="center"
        h="100vh"
        align="center"
        bgImage={signUpImage}
        bgSize="cover"
        position="fixed"
        zIndex={'-1'}
        sx={{ filter: 'blur(1px)' }}
      ></Flex>
      <Flex
        w="100vw"
        h="100vh"
        justify={'center'}
        align="center"
        bgColor="blackAlpha.500"
      >
        <Flex
          w="30vw"
          h="30vh"
          bgColor="whiteAlpha.500"
          align="center"
          justify={'center'}
          borderRadius="3xl"
        >
          <Button
            colorScheme={'blackAlpha'}
            size="lg"
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
