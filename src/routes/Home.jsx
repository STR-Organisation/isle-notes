import { Divider, Grid, GridItem, Heading, Spinner } from '@chakra-ui/react';
import { collection, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Navbar } from '../components/Navbar';
import ProposalNotification from '../components/ProposalNotification';
import { auth, db } from '../firebase-config';
import { getKeyByValue, SUBJECT_SHORTHAND } from '../utils';

export default function Home() {
  const proposalRef = collection(db, 'proposals');

  const [user] = useAuthState(auth);

  let q;
  if (user) {
    q = query(proposalRef, where('uid', '==', user.uid));
  }

  const [proposals] = useCollectionData(q);

  return (
    <>
      <Navbar />
      <Grid templateColumns={'repeat(5, 1fr)'} h="93vh">
        <GridItem colSpan={4} bg="beige">
          Main Content
        </GridItem>
        <GridItem overflow={'auto'}>
          <Heading size="sm" p={3}>
            My Proposals
          </Heading>
          <Divider />
          {proposals ? (
            proposals.map((v, idx) => {
              console.log(v);
              return (
                <ProposalNotification
                  className={getKeyByValue(SUBJECT_SHORTHAND, v.className)}
                  title={v.topic}
                  status={v.isApproved ? 'approved' : 'rejected'}
                  onClose={console.log}
                />
              );
            })
          ) : (
            <Spinner color="tomato" />
          )}
        </GridItem>
      </Grid>
    </>
  );
}
