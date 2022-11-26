import { Heading } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CenteredSpinner from '../components/CenteredSpinner';
import { Navbar } from '../components/Navbar';
import { auth, db } from '../firebase-config';

export default function EditProposal() {
  const { id } = useParams();
  const [data, setData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoc = async () => {
      const docRef = doc(db, 'proposals', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        navigate('/');
      }

      if (docSnap.data().uid !== auth.currentUser.uid) {
        navigate('/');
      }

      setData(docSnap.data());
    };
    fetchDoc();
  }, []);

  return (
    <>
      <Navbar />
      {data ? <Heading>{id}</Heading> : <CenteredSpinner />}
    </>
  );
}
