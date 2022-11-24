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
} from '@chakra-ui/react';
import { SUBJECT_SHORTHAND } from '../utils';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import './Markdown.css';

export default function ProposeNotes() {
  const proposalRef = collection(db, 'proposals');

  const classRef = useRef();
  const topicRef = useRef();
  const [note, setNote] = useState();

  const [user] = useAuthState(auth);

  const propose = async () => {
    const data = {
      uid: user.uid,
      displayName: user.displayName,
      className: classRef.current.value,
      topic: topicRef.current.value,
      note,
    };

    console.log(data);

    await addDoc(proposalRef, data);
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
          <Flex>
            <Textarea
              w="50vw"
              h="30vh"
              onChange={e => setNote(e.target.value)}
            />
            <Box>
              <div className="main">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={rehypeKatex}
                  children={note}
                />
              </div>
            </Box>
          </Flex>
        </VStack>
        <Button onClick={propose} colorScheme={'red'}>
          Propose
        </Button>
      </Flex>
    </>
  );
}
