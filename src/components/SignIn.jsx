import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { signInWithGoogle } from '../firebase-config';

export default function SignIn() {
  return (
    <Flex width={'100%'} justify="center">
      <Button colorScheme={'red'} onClick={signInWithGoogle}>
        Sign In With Google
      </Button>
    </Flex>
  );
}
