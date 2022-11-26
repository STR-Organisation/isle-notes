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
  Grid,
  GridItem,
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

  const [note, setNote] = useState('Type here...');
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
      <Grid
        templateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(7, 1fr)' }}
        height="93vh"
        w="100%"
        mt={2}
      >
        <GridItem
          colSpan={1}
          borderRight="1px"
          borderColor={'gray.200'}
          pl={3}
          pr={3}
        >
          <VStack align={'center'}>
            <Text
              fontSize={'xl'}
              fontWeight="bold"
              mb={2}
              color="messenger.500"
            >
              Notes Metadata
            </Text>
            <HStack>
              <Text fontWeight={'semibold'} fontSize="lg" mr={7}>
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
            <HStack>
              <Button onClick={propose} colorScheme={'messenger'}>
                Propose
              </Button>
              <Button
                colorScheme={'messenger'}
                onClick={() => {
                  setIsPreview(!isPreview);
                }}
              >
                {isPreview ? 'Hide' : 'Show'} Preview
              </Button>
            </HStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={{ base: 2, lg: 6 }}>
          <Flex flexDirection="column" align="center">
            {!isPreview && (
              <Textarea
                w="100%"
                h="93vh"
                onChange={e => setNote(e.target.value)}
                value={note}
                borderRadius="none"
                borderTop={'none'}
              />
            )}
            {isPreview && (
              <Box
                w="100%"
                h="100%"
                bg={'gray.50'}
                borderRadius="none"
                borderTop={'none'}
              >
                <Markdown>{note}</Markdown>
              </Box>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
}
