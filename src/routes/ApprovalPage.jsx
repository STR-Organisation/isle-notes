import { Heading } from '@chakra-ui/react';
import { collection, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Navbar } from '../components/Navbar';
import { auth, db } from '../firebase-config';
import CenteredSpinner from '../components/CenteredSpinner';
import { useNavigate } from 'react-router-dom';

export default function ApprovalPage() {
  const organizerTableRef = collection(db, 'organizers');

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  let q;
  if (user) {
    q = query(organizerTableRef, where('uid', '==', user.uid));
  }
  const [organizerInfo] = useCollectionData(q, {
    idField: 'id',
  });

  useEffect(() => {
    console.log(organizerInfo);

    if (organizerInfo) {
      if (!organizerInfo[0].isOrganizer) {
        navigate('/');
      }
    }
  }, [organizerInfo]);

  return (
    <>
      <Navbar />
      {organizerInfo ? (
        <Heading>{`${organizerInfo[0].isOrganizer}`}</Heading>
      ) : (
        <CenteredSpinner />
      )}
    </>
  );
}
