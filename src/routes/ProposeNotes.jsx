import React, { useRef, useState } from 'react';
import { Navbar } from '../components/Navbar';
import {
  Button,
  HStack,
  Input,
  Select,
  Text,
  VStack,
  Box,
  useToast,
  Grid,
  GridItem,
  FormLabel,
} from '@chakra-ui/react';
import { SUBJECT_SHORTHAND } from '../utils';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import MyEditor from '../components/MyEditor';
import '../components/MyEditor';

export default function ProposeNotes() {
  const toast = useToast();

  const proposalRef = collection(db, 'proposals');

  const classRef = useRef();
  const topicRef = useRef();
  const fileRef = useRef();

  const [currentFileName, setCurrentFileName] = useState('');

  const [note, setNote] = useState('# Proposal');

  const [user] = useAuthState(auth);

  const propose = async () => {
    if (!isValid()) {
      return;
    }

    let fileName = '';
    if (fileRef.current.files.length !== 0) {
      fileName = v4() + currentFileName;
      const proposalRef = ref(storage, `proposals/${fileName}`);
      await uploadBytes(proposalRef, fileRef.current.files[0]);
    }

    const data = {
      uid: user.uid,
      email: user.email,
      className: classRef.current.value,
      topic: topicRef.current.value,
      note,
      status: 'none',
      viewed: false,
      fileName,
    };

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
    fileRef.current.files = null;
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
        templateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }}
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
            <Box></Box>
            <Box></Box>
            <Box></Box>
            <Button w="100%" onClick={propose} variant={'primary'}>
              Propose
            </Button>
            <FormLabel
              bg="brand.secondaryAccent"
              p={2}
              color="white"
              textAlign={'center'}
              htmlFor="proposal-file"
              w="100%"
              borderRadius={'md'}
              _hover={{
                backgroundColor: 'brand.secondaryAccentGradient',
              }}
              cursor="pointer"
            >
              <Input
                id="proposal-file"
                type="file"
                display={'none'}
                accept=".docx,.md,.doc"
                ref={fileRef}
                onChange={e => {
                  setCurrentFileName(e.target.files[0].name);
                }}
              />
              File Upload
            </FormLabel>
            {currentFileName && (
              <Text color="gray.500">File Name: {currentFileName}</Text>
            )}
          </VStack>
        </GridItem>
        <GridItem colSpan={{ base: 2, lg: 4 }} h="93vh">
          <MyEditor setText={setNote} initialValue="" />
        </GridItem>
      </Grid>
    </>
  );
}
