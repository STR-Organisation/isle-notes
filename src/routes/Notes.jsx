import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import SubjectDisplay from '../components/SubjectDisplay';
import { Flex, Heading, Box } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase-config';
import { query, getDocs, where, collection } from 'firebase/firestore';
import CenteredSpinner from '../components/CenteredSpinner';
import { SUBJECT_PICTURES, SUBJECT_SHORTHAND } from '../utils';

export default function Notes() {
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState();
  const userProfileRef = collection(db, 'userProfile');

  useEffect(() => {
    const getData = async () => {
      const q = query(userProfileRef, where('uid', '==', user.uid));
      const data = await getDocs(q);
      setProfile(data.docs.map(doc => ({ ...doc.data() })));
    };
    getData();
  }, [user]);
  return (
    <>
      <Navbar />
      {profile ? (
        <Flex flexWrap={'wrap'}>
          {profile[0].classes.map((e, idx) => {
            return (
              <SubjectDisplay
                image={SUBJECT_PICTURES[SUBJECT_SHORTHAND[e]]}
                title={e}
                to={`/notes/${SUBJECT_SHORTHAND[e]}`}
              />
            );
          })}
        </Flex>
      ) : (
        <CenteredSpinner />
      )}
    </>
  );
}
