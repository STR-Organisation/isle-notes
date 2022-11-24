import { Heading, Flex, Button } from '@chakra-ui/react';
import { collection, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Navbar } from '../components/Navbar';
import { auth, db } from '../firebase-config';
import CenteredSpinner from '../components/CenteredSpinner';
import { useNavigate } from 'react-router-dom';
import { getKeyByValue, SUBJECT_SHORTHAND } from '../utils';
import Markdown from '../components/Markdown';

export default function ApprovalPage() {
  const organizerTableRef = collection(db, 'organizers');
  const proposalTableRef = collection(db, 'proposals');

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  let organizerQuery, proposalsQuery;
  if (user) {
    organizerQuery = query(organizerTableRef, where('uid', '==', user.uid));
    proposalsQuery = query(proposalTableRef, where('isApproved', '==', false));
  }
  const [organizerInfo] = useCollectionData(organizerQuery, {
    idField: 'id',
  });

  const [proposalInfo] = useCollectionData(proposalsQuery, {
    idField: 'id',
  });

  useEffect(() => {
    if (organizerInfo) {
      if (!organizerInfo[0].isOrganizer) {
        navigate('/');
      }
    }
  }, [organizerInfo]);

  useEffect(() => {
    if (proposalInfo) {
      console.log(proposalInfo);
    }
  }, [proposalInfo]);

  return (
    <>
      <Navbar />
      {organizerInfo ? (
        <Flex flexDir={'column'} w="100%" align={'center'}>
          {proposalInfo.map((v, idx) => {
            return (
              <>
                <Flex
                  flexDir={'column'}
                  key={idx}
                  border="1px"
                  p={4}
                  marginBlock={2}
                  borderColor="gray.200"
                  borderRadius={'lg'}
                >
                  <Heading fontSize={'xl'}>
                    {getKeyByValue(SUBJECT_SHORTHAND, v.className)}: {v.topic}
                  </Heading>
                  <Markdown children={v.note} />
                  <Button colorScheme={'red'}>Approve</Button>
                </Flex>
              </>
            );
          })}
        </Flex>
      ) : (
        <CenteredSpinner />
      )}
    </>
  );
}
