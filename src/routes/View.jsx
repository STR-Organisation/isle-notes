import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Box } from '@chakra-ui/react';
import {
  doc,
  getDoc,
  query,
  getDocs,
  where,
  collection,
} from 'firebase/firestore';
import { db } from '../firebase-config';
import { auth } from '../firebase-config';
import Markdown from '../components/Markdown';

export default function View() {
  const { id } = useParams();

  const [note, setNote] = useState();

  const navigate = useNavigate();

  const organizerRef = collection(db, 'organizers');

  useEffect(() => {
    const fetchDoc = async () => {
      const docRef = doc(db, 'proposals', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        navigate('/aia-website/home');
      }

      const organizerQuery = query(
        organizerRef,
        where('uid', '==', auth.currentUser.uid)
      );
      const organizerData = await getDocs(organizerQuery);

      if (organizerData.docs[0].data().isOrganizer) {
        console.log('organizer');
        setNote(docSnap.data().note);
        return;
      }

      if (docSnap.data().uid !== auth.currentUser.uid) {
        navigate('/aia-website/home');
      }

      setNote(docSnap.data().note);
    };
    fetchDoc();
  }, []);
  return (
    <>
      <Navbar />
      <Box
        w="100%"
        h="93vh"
        bg={'gray.50'}
        borderRadius="none"
        borderTop={'none'}
      >
        <Markdown>{note}</Markdown>
      </Box>
    </>
  );
}
