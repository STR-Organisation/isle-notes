import React, { useEffect } from 'react';
import { Flex, Heading, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import { query, where, addDoc, getDocs, collection } from 'firebase/firestore';
import { getFirstName, getLastName } from '../utils';

export default function InitializeUser() {
  const userProfileRef = collection(db, 'userProfile');
  const organizerRef = collection(db, 'organizers');

  const navigate = useNavigate();
  useEffect(() => {
    const checkStatus = async () => {
      const validationQuery = query(
        userProfileRef,
        where('uid', '==', auth.currentUser.uid)
      );
      const docData = await getDocs(validationQuery);

      if (docData.docs.length > 0) {
        navigate('/aia-website/home');
        return;
      }

      const data = {
        uid: auth.currentUser.uid,
        firstName: getFirstName(auth.currentUser.displayName),
        lastName: getLastName(auth.currentUser.displayName),
        classes: ['IB TOK'],
        path: 'none',
      };

      const organizerData = {
        uid: auth.currentUser.uid,
        isOrganizer: false,
      };

      await addDoc(userProfileRef, data);
      await addDoc(organizerRef, organizerData);

      navigate('/aia-website/home');
    };
    checkStatus();
  }, []);

  return (
    <Flex w="100vw" h="90vh" align={'center'} justify="center">
      <Heading>
        Initializing User <Spinner ml={2} color="messenger.500" />
      </Heading>
    </Flex>
  );
}
