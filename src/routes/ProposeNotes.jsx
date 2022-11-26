import React, { useRef, useState } from 'react';
import { Navbar } from '../components/Navbar';
import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
  Box,
  useToast,
} from '@chakra-ui/react';
import { SUBJECT_SHORTHAND } from '../utils';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import Markdown from '../components/Markdown';

export default function ProposeNotes() {
  const toast = useToast();

  const proposalRef = collection(db, 'proposals');

  const classRef = useRef();
  const topicRef = useRef();

  const [note, setNote] = useState();
  const [isPreview, setIsPreview] = useState(false);

  const [user] = useAuthState(auth);

  const propose = async () => {
    if (!isValid()) {
      return;
    }

    const data = {
      uid: user.uid,
      email: user.email,
      className: classRef.current.value,
      topic: topicRef.current.value,
      note,
      status: 'none',
      viewed: false,
    };

    console.log(data);

    const d = await addDoc(proposalRef, data);

    // update doc with id, necessary for notifications
    await updateDoc(d, { ...data, id: d.id });

    toast({
      position: 'bottom-left',
      title: 'Success',
      status: 'success',
      description: 'Proposal submitted.',
      duration: 3000,
    });

    clearInput();
  };

  const clearInput = () => {
    setNote('');
    topicRef.current.value = '';
    classRef.current.value = '';
  };

  const isValid = () => {
    let valid = true;
    let message = '';
    if (classRef.current.value === '') {
      valid = false;
      message = 'Please fill out the `class` field';
    } else if (topicRef.current.value === '') {
      valid = false;
      message = 'Please fill out the `topic` field';
    } else if (!note) {
      valid = false;
      message = 'Please fill out the `note` field';
    }

    if (!valid) {
      toast({
        position: 'bottom-left',
        title: 'Invalid Input',
        description: message,
        status: 'error',
        duration: 3000,
      });
    }

    return valid;
  };

  return (
    <>
      <Navbar />
      <Flex w="100%" align={'center'} mt={2} flexDir="column" gap={4}>
        <Heading fontSize={'xl'}>Propose Notes</Heading>
        <Divider />
        <VStack align={'flex-start'}>
          <Text fontSize={'xl'} fontWeight="bold" mb={2} color="tomato">
            Notes Metadata
          </Text>
          <HStack>
            <Text fontWeight={'semibold'} fontSize="lg" mr={8}>
              Class
            </Text>
            <Select placeholder="Select class" ref={classRef}>
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
            <Input placeholder="Type here..." ref={topicRef} />
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
          <Button onClick={propose} colorScheme={'teal'}>
            Propose
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
  );
}
