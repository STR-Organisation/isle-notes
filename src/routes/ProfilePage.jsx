import {
  HStack,
  Flex,
  Heading,
  VStack,
  Input,
  Text,
  Divider,
  Select,
  Button,
  Spinner,
} from '@chakra-ui/react';
import {
  addDoc,
  collection,
  query,
  updateDoc,
  where,
  doc,
  getDocs,
} from 'firebase/firestore';
import React, { useRef, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import CustomCheckbox from '../components/CustomCheckbox';
import { Navbar } from '../components/Navbar';
import { auth, db } from '../firebase-config';
import { getFirstName, getLastName } from '../utils';

const allClasses = [
  [
    'IB Economics SL',
    'IB TOK',
    'IB History HL 1',
    'IB ESS SL',
    'IB Chemistry SL',
    'IB Math A&A HL',
    'IB Pers. & Prof. Skills',
    'IB Spanish SL/HL',
    'IB French SL/HL',
    'IB CS SL/HL',
    'IB Theatre Arts SL/HL',
    'IB Film SL',
  ],
  [
    'IB Psychology SL',
    'IB World Religions SL',
    'IB History HL 2',
    'IB Exercise Science SL',
    'IB Physics HL',
    'IB Biology HL',
    'IB Math A&A SL',
    'IB Mandarin Chinese SL/HL',
    'IB Japanese SL/HL',
    'IB Lang. and Lit. HL',
    'IB Business SL/HL',
    'IB Visual Arts SL/HL',
    'IB Music SL',
  ],
];

export default function ProfilePage() {
  const [classes, setClasses] = useState([]);
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState([]);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const pathRef = useRef();
  const userProfileRef = collection(db, 'userProfile');

  const updateUser = async () => {
    const data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      path: pathRef.current.value,
      classes: [...classes, ...profile[0].classes],
      uid: user.uid,
    };

    console.log(data);
    const q = query(userProfileRef, where('uid', '==', user.uid));

    const snap = await getDocs(q);

    if (snap.docs.length === 0) {
      await addDoc(userProfileRef, data);
      return;
    }

    snap.forEach(async d => {
      console.log(data);
      const userDoc = doc(db, 'userProfile', d.id);
      await updateDoc(userDoc, data);
    });
  };

  useEffect(() => {
    const getData = async () => {
      const q = query(userProfileRef, where('uid', '==', user.uid));
      const data = await getDocs(q);
      setProfile(data.docs.map(doc => ({ ...doc.data() })));
    };
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <Flex w="100%" align={'center'} flexDir="column">
        <Heading fontSize={'3xl'}>
          Welcome, {auth.currentUser.displayName}!
        </Heading>

        <Divider w={'40vw'} mt={4} />

        <VStack align={'flex-start'} mt={2} w={'40vw'}>
          <Heading fontSize={'xl'} color="tomato">
            Basic Info
          </Heading>

          <HStack>
            <Text fontSize={'sm'} w={'10ch'}>
              First
            </Text>
            <Input
              maxW={'20vw'}
              size="sm"
              fontSize={'sm'}
              placeholder="Name"
              defaultValue={getFirstName(auth.currentUser.displayName)}
              ref={firstNameRef}
            />
          </HStack>
          <HStack>
            <Text fontSize={'sm'} w={'10ch'}>
              Last
            </Text>
            <Input
              maxW={'20vw'}
              size="sm"
              fontSize={'sm'}
              placeholder="Name"
              defaultValue={getLastName(auth.currentUser.displayName)}
              ref={lastNameRef}
            />
          </HStack>
          <HStack>
            <Text fontSize={'sm'} w={'10ch'}>
              Email
            </Text>
            <Input
              maxW={'20vw'}
              size="sm"
              fontSize={'sm'}
              value={auth.currentUser.email}
              disabled={true}
            />
          </HStack>
        </VStack>

        <Divider w={'40vw'} mt={2} mb={2} />

        <VStack w={'40vw'} mt={2} align="flex-start">
          <Heading fontSize={'xl'} color="tomato">
            IB Information
          </Heading>
          <HStack>
            <Text fontWeight={'semibold'} w={'10ch'}>
              IB Path
            </Text>
            <Select
              fontSize={'sm'}
              size="sm"
              ref={pathRef}
              value={profile[0]?.path}
              onChange={e => {
                const temp = profile[0];
                temp.path = pathRef.current.value;
                setProfile([temp]);
              }}
            >
              <option value={'dp'}>IB Diploma Path</option>
              <option value={'cp'}>IB Career Path</option>
              <option value={'none'}>None</option>
            </Select>
          </HStack>

          <Text fontWeight={'semibold'} w={'10ch'} mt={4}>
            My Classes
          </Text>

          <HStack>
            {allClasses.map((e, idx) => {
              return (
                <VStack key={idx} align="flex-start">
                  {e.map((c, idx2) => {
                    return (
                      <CustomCheckbox
                        onChange={setClasses}
                        value={classes}
                        option={c}
                        key={(idx + 1) * idx2}
                        checked={profile[0]?.classes.includes(c)}
                      />
                    );
                  })}
                </VStack>
              );
            })}
          </HStack>
        </VStack>
        <Divider w={'40vw'} mt={2} />
        <Button onClick={updateUser} colorScheme={'red'} mt={8}>
          Update Information
        </Button>
      </Flex>
    </>
  );
}
