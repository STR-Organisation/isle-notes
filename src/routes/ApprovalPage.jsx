import { Heading, Flex, Button, useToast } from '@chakra-ui/react';
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
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
  const [proposals, setProposals] = useState([]);
  const navigate = useNavigate();

  const toast = useToast();

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
    const fetchProposals = async () => {
      const data = await getDocs(proposalsQuery);
      setProposals(data.docs.map(f => ({ ...f.data(), id: f.id })));
    };
    fetchProposals();
    // having this as a dependency helps for some reason
  }, [proposalInfo]);

  const approve = async (docId, ob) => {
    setProposals(proposals.filter(x => x !== ob));
    toast({
      title: 'Approved!',
      duration: 3000,
      status: 'success',
      position: 'bottom-left',
      description: `Approved topic \`${ob.topic}\``,
    });
    const proposal = doc(db, 'proposals', docId);
    const newData = ob;
    newData.isApproved = true;
    await updateDoc(proposal, newData);
  };

  const reject = async (docId, ob) => {
    setProposals(proposals.filter(x => x !== ob));
    toast({
      title: 'Rejected',
      duration: 3000,
      status: 'error',
      position: 'bottom-left',
      description: `Rejected topic \`${ob.topic}\``,
    });
    const proposal = doc(db, 'proposals', docId);
    await deleteDoc(proposal);
  };

  return (
    <>
      <Navbar />
      {organizerInfo ? (
        <Flex flexDir={'column'} w="100%" align={'center'}>
          {proposals.map((v, idx) => {
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
                  minW="40vw"
                >
                  <Heading fontSize={'xl'}>
                    {getKeyByValue(SUBJECT_SHORTHAND, v.className)}: {v.topic}
                  </Heading>
                  <Markdown children={v.note} />
                  <Flex w={'100%'} justify={'space-evenly'}>
                    <Button
                      colorScheme={'green'}
                      w={'17ch'}
                      onClick={() => {
                        approve(v.id, v);
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      colorScheme={'red'}
                      w={'17ch'}
                      onClick={() => {
                        reject(v.id, v);
                      }}
                    >
                      Reject
                    </Button>
                  </Flex>
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
