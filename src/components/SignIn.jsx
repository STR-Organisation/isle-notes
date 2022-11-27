import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { auth, db, signInWithGoogle } from '../firebase-config';
import { addDoc, collection } from 'firebase/firestore';
import { getFirstName, getLastName } from '../utils';

export default function SignIn() {
  const userProfileRef = collection(db, 'userProfile');

  const signIn = async () => {
    signInWithGoogle();
    const data = {
      uid: auth.currentUser.uid,
      firstName: getFirstName(auth.currentUser.displayName),
      lastName: getLastName(auth.currentUser.displayName),
      classes: ['IB Chemistry SL'],
      path: 'none',
    };

    await addDoc(userProfileRef, data);
  };

  return (
    <Flex width={'100%'} justify="center">
      <Button colorScheme={'red'} onClick={signIn}>
        Sign In With Google
      </Button>
    </Flex>
  );
}
