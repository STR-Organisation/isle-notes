import {
  Button,
  Divider,
  Grid,
  GridItem,
  Heading,
  Flex,
  Text,
  Link,
} from '@chakra-ui/react';
import { collection, doc, query, updateDoc, where } from 'firebase/firestore';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import CenteredSpinner from '../components/CenteredSpinner';
import { Navbar } from '../components/Navbar';
import ProposalNotification from '../components/ProposalNotification';
import { auth, db } from '../firebase-config';
import { getKeyByValue, SUBJECT_SHORTHAND } from '../utils';
import { Dashboard } from '../components/Dashboard';
import { Link as RouterLink } from 'react-router-dom';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function Home() {
  const proposalRef = collection(db, 'proposals');

  const [user] = useAuthState(auth);

  let q;
  if (user) {
    q = query(
      proposalRef,
      where('uid', '==', user.uid),
      where('viewed', '==', false)
    );
  }

  const [proposals] = useCollectionData(q);

  const remove = async (id, ob) => {
    const proposal = doc(db, 'proposals', id);
    const newData = ob;
    newData.viewed = true;
    await updateDoc(proposal, newData);
  };

  return (
    <>
      <Navbar />
      <Grid
        templateColumns={{ base: 'repeat(5, 1fr)', lg: 'repeat(9, 1fr)' }}
        h="93vh"
      >
        <GridItem colSpan={{ base: 4, lg: 8 }}>
          <Dashboard />
        </GridItem>
        <GridItem
          overflow={'auto'}
          zIndex={'banner'}
          borderLeft="1px"
          borderColor={'gray.200'}
        >
          <Heading size="sm" p={3}>
            My Proposals
          </Heading>

          <RouterLink to="/notes/propose/all">
            <Link>
              <Text color={'gray.500'} pl={3} pb={3} fontSize="sm">
                All Proposals <ExternalLinkIcon />{' '}
              </Text>
            </Link>
          </RouterLink>
          <Divider />
          {proposals ? (
            proposals.length !== 0 ? (
              proposals.map((v, idx) => {
                return (
                  <ProposalNotification
                    className={getKeyByValue(SUBJECT_SHORTHAND, v.className)}
                    title={v.topic}
                    status={v.status}
                    onClose={() => {
                      remove(v.id, v);
                    }}
                    key={idx}
                    to={`/notes/propose/edit/${v.id}`}
                  />
                );
              })
            ) : (
              <RouterLink to="/notes/propose">
                <Flex>
                  <Button w="80%" mx={'auto'} mt={2} variant={'primary'}>
                    New Proposal
                  </Button>
                </Flex>
              </RouterLink>
            )
          ) : (
            <CenteredSpinner />
          )}
        </GridItem>
      </Grid>
    </>
  );
}
