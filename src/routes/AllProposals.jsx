import { Flex } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import CenteredSpinner from '../components/CenteredSpinner';
import { Navbar } from '../components/Navbar';
import ViewProposal from '../components/ViewProposal';
import { auth, db } from '../firebase-config';

export default function AllProposals() {
  const proposalRef = collection(db, 'proposals');

  const [user] = useAuthState(auth);
  const [proposals, setProposals] = useState();

  let q;
  if (user) {
    q = query(proposalRef, where('uid', '==', user.uid));
  }

  useEffect(() => {
    const fetchProposals = async () => {
      const data = await getDocs(q);
      setProposals(data.docs.map(v => ({ ...v.data(), id: v.id })));
    };
    fetchProposals();
    console.log(proposals);
  }, []);

  return (
    <>
      <Navbar />
      {proposals ? (
        <Flex h="full" flexWrap={'wrap'}>
          {proposals.map((v, idx) => (
            <ViewProposal proposal={v} />
          ))}
        </Flex>
      ) : (
        <CenteredSpinner />
      )}
    </>
  );
}
