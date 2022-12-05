import {
  Select,
  Text,
  VStack,
  HStack,
  Input,
  Button,
  Box,
  Grid,
  GridItem,
  useToast,
  FormLabel,
} from '@chakra-ui/react';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CenteredSpinner from '../components/CenteredSpinner';
import { Navbar } from '../components/Navbar';
import { auth, db, storage } from '../firebase-config';
import { SUBJECT_SHORTHAND } from '../utils';
import { query, where, getDocs } from 'firebase/firestore';
import MyEditor from '../components/MyEditor';
import { v4 } from 'uuid';
import { ref, uploadBytes } from 'firebase/storage';

export default function EditProposal() {
  const { id } = useParams();

  const organizerRef = collection(db, 'organizers');

  const [data, setData] = useState();
  const [note, setNote] = useState();
  const [currentFileName, setCurrentFileName] = useState();

  const topicRef = useRef();
  const classRef = useRef();
  const fileRef = useRef();

  const navigate = useNavigate();

  const toast = useToast();

  useEffect(() => {
    const fetchDoc = async () => {
      const docRef = doc(db, 'proposals', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        navigate('/home');
      }

      const organizerQuery = query(
        organizerRef,
        where('uid', '==', auth.currentUser.uid)
      );
      const organizerData = await getDocs(organizerQuery);

      if (organizerData.docs[0].data().isOrganizer) {
        console.log('organizer');
        setData(docSnap.data());
        setNote(docSnap.data().note);
        return;
      }

      if (docSnap.data().uid !== auth.currentUser.uid) {
        navigate('/home');
      }

      setData(docSnap.data());
      setNote(docSnap.data().note);
    };
    fetchDoc();
  }, []);

  const edit = async () => {
    console.log(classRef.current.value);

    let fileName = '';
    if (fileRef.current.files.length !== 0) {
      fileName = v4() + currentFileName;
      const proposalRef = ref(storage, `proposals/${fileName}`);
      await uploadBytes(proposalRef, fileRef.current.files[0]);
    }

    const newData = {
      topic: topicRef.current.value,
      className: classRef.current.value,
      note,
      status: 'none',
      viewed: false,
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      fileName,
    };
    console.log(newData);
    const docRef = doc(db, 'proposals', id);
    await updateDoc(docRef, newData);
    toast({
      title: 'Edit Successful',
      status: 'success',
      position: 'bottom-left',
      duration: 3000,
    });
    navigate('/notes/propose');
  };

  return (
    <>
      <Navbar />
      {data ? (
        <>
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
                <Text
                  fontSize={'xl'}
                  fontWeight="bold"
                  mb={2}
                  color="messenger.500"
                >
                  Edit Note
                </Text>
                <HStack>
                  <Text fontWeight={'semibold'} fontSize="lg" mr={7}>
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
                <Box></Box>
                <Box></Box>
                <Box></Box>
                <Button onClick={edit} w="100%" colorScheme={'messenger'}>
                  Confirm
                </Button>
                <FormLabel
                  bg="messenger.500"
                  p={2}
                  color="white"
                  textAlign={'center'}
                  htmlFor="proposal-file"
                  w="100%"
                  borderRadius={'md'}
                  _hover={{
                    backgroundColor: 'messenger.600',
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
            <GridItem colSpan={{ base: 2, lg: 4 }}>
              <MyEditor setText={setNote} initialValue={note} />
            </GridItem>
          </Grid>
        </>
      ) : (
        <CenteredSpinner />
      )}
    </>
  );
}
