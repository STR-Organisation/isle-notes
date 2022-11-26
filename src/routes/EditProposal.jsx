import {
  Heading,
  Flex,
  Divider,
  Select,
  Text,
  VStack,
  HStack,
  Input,
  Button,
  Box,
  Textarea,
} from '@chakra-ui/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CenteredSpinner from '../components/CenteredSpinner';
import { Navbar } from '../components/Navbar';
import { auth, db } from '../firebase-config';
import { SUBJECT_SHORTHAND } from '../utils';
import Markdown from '../components/Markdown';

export default function EditProposal() {
  const { id } = useParams();

  const [data, setData] = useState();
  const [isPreview, setIsPreview] = useState(false);
  const [note, setNote] = useState();

  const topicRef = useRef();
  const classRef = useRef();

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

  const edit = async () => {
    console.log(classRef.current.value);
    const newData = {
      topic: topicRef.current.value,
      className: classRef.current.value,
      note,
      status: 'none',
      viewed: false,
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
    };
    console.log(newData);
    const docRef = doc(db, 'proposals', id);
    await updateDoc(docRef, newData);
  };

  return (
    <>
      <Navbar />
      {data ? (
        <>
          <Flex w="100%" align={'center'} mt={2} flexDir="column" gap={4}>
            <Heading fontSize={'xl'}>Edit Proposal</Heading>
            <Divider />
            <VStack align={'flex-start'}>
              <HStack>
                <Text fontWeight={'semibold'} fontSize="lg" mr={8}>
                  Class
                </Text>
                <Select
                  placeholder="Select class"
                  ref={classRef}
                  defaultValue={data.className}
                >
                  {Object.entries(SUBJECT_SHORTHAND).map((v, idx) => {
                    const [key, value] = v;
                    return (
                      <option value={value} key={idx}>
                        {key}
                      </option>
                    );
                  })}
                </Select>
              </HStack>
              <HStack>
                <Text fontWeight={'semibold'} fontSize="lg" w="10ch">
                  Topic
                </Text>
                <Input
                  placeholder="Type here..."
                  ref={topicRef}
                  defaultValue={data.topic}
                />
              </HStack>
            </VStack>
            <Divider />
            <VStack>
              <Flex>
                <Heading fontSize="xl" color="tomato">
                  Note Editor
                </Heading>
              </Flex>
              {!isPreview && (
                <Textarea
                  w="40vw"
                  h="50vh"
                  onChange={e => setNote(e.target.value)}
                  value={note}
                  defaultValue={data.note}
                />
              )}
              {isPreview && (
                <Box
                  w="40vw"
                  h="50vh"
                  border="1px"
                  borderColor={'gray.200'}
                  borderRadius="lg"
                  bg={'gray.50'}
                >
                  <Markdown>{note}</Markdown>
                </Box>
              )}
            </VStack>
            <HStack>
              <Button onClick={edit} colorScheme={'teal'}>
                Edit
              </Button>
              <Button
                colorScheme={'teal'}
                onClick={() => {
                  setIsPreview(!isPreview);
                }}
              >
                {isPreview ? 'Hide' : 'Show'} Preview
              </Button>
            </HStack>
          </Flex>
        </>
      ) : (
        <CenteredSpinner />
      )}
    </>
  );
}
