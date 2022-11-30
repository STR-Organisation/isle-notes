import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Link,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Router, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { getKeyByValue, getProposalURL, SUBJECT_SHORTHAND } from '../utils';
import TopicText from '../components/TopicText';
import Markdown from '../components/Markdown';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { CloseIcon, DownloadIcon, EditIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

export default function SubjectNotes() {
  const { subject } = useParams();

  const [currTopic, setCurrTopic] = useState('default');
  const [isOrganizer, setIsOrganizer] = useState(false);

  const fullName = getKeyByValue(SUBJECT_SHORTHAND, subject);

  const proposalRef = collection(db, 'proposals');
  const organizerRef = collection(db, 'organizers');

  const q = query(
    proposalRef,
    where('status', '==', 'approved'),
    where('className', '==', subject)
  );

  // DO NOT REMOVE THIS
  // this helps the page work for some reason
  const proposals = useCollectionData(q);

  const topics = useRef({
    default: `# ${fullName}`,
  });

  const topicRoutes = useRef({
    default: `aia-website/notes/${subject}`,
  });

  const topicIds = useRef({});

  const topicsWithFiles = useRef({});

  const downloadURLS = useRef({});

  const navigate = useNavigate();

  const toast = useToast();

  useEffect(() => {
    const fetchProposals = async () => {
      const data = await getDocs(q);
      data.forEach(proposal => {
        const { topic, note } = proposal.data();
        topics.current[topic] = note;
      });

      const organizerQuery = query(
        organizerRef,
        where('uid', '==', auth.currentUser.uid)
      );
      const organizerData = await getDocs(organizerQuery);

      if (
        !organizerData.docs[0].exists() ||
        !organizerData.docs[0].data().isOrganizer
      ) {
        console.log('not an organizer');
        return;
      }
      setIsOrganizer(true);
    };
    fetchProposals();
  }, []);

  useEffect(() => {
    topics.current = {
      default: `# ${fullName}`,
    };
    const fetchProposals = async () => {
      const data = await getDocs(q);
      data.forEach(async proposal => {
        const { topic, note, fileName } = proposal.data();
        topics.current[topic] = note;
        topicRoutes.current[topic] = `/notes/propose/edit/${proposal.id}`;
        topicIds.current[topic] = proposal.id;
        if (!fileName) return;
        topicsWithFiles.current[topic] = true;
        downloadURLS.current[topic] = await getProposalURL(fileName);
        console.log(downloadURLS.current);
      });
    };
    fetchProposals();
  }, [subject]);

  const rejectCurrentProposal = async () => {
    if (currTopic === 'default') {
      toast({
        title: 'Invalid removal',
        description: 'Cannot remove default topic',
        status: 'error',
        duration: 3000,
        position: 'bottom-left',
      });
    }
    const docRef = doc(db, 'proposals', topicIds.current[currTopic]);
    const docSnap = await getDoc(docRef);
    const newData = docSnap.data();
    newData.status = 'rejected';
    newData.viewed = false;
    await updateDoc(docRef, newData);
    toast({
      title: 'Removal successful',
      status: 'success',
      duration: 3000,
      position: 'bottom-left',
    });
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <ButtonGroup position="fixed" bottom="2%" right="2%">
        {topicsWithFiles.current[currTopic] && (
          <>
            <Link href={downloadURLS.current[currTopic]} download>
              <IconButton icon={<DownloadIcon />} colorScheme={'messenger'} />
            </Link>
          </>
        )}
        {isOrganizer && (
          <>
            <RouterLink to={topicRoutes.current[currTopic]}>
              <IconButton icon={<EditIcon />} colorScheme="messenger" />
            </RouterLink>
            <IconButton
              fontSize="xs"
              icon={<CloseIcon />}
              colorScheme="messenger"
              onClick={rejectCurrentProposal}
            />
          </>
        )}
      </ButtonGroup>
      <Flex overflowX={'hidden'} overflowY="auto">
        <Flex
          borderRight="1px"
          borderRightColor={'gray.200'}
          w={{ base: 'full', md: 60 }}
          pos="static"
          minH={'93vh'}
          borderTop={'1px'}
          borderTopColor={'gray.200'}
          align="center"
          flexDir={'column'}
        >
          <Heading
            mt={5}
            fontSize={'md'}
            cursor="pointer"
            onClick={() => {
              setCurrTopic('default');
            }}
            mb={2}
          >
            {fullName}
          </Heading>
          {Object.entries(topics.current).map((e, idx) => {
            const [key, _] = e;
            if (key === 'default') return <></>;
            return (
              <TopicText
                onClick={setCurrTopic}
                highlighted={key === currTopic}
                key={idx}
                textValue={key}
              />
            );
          })}
        </Flex>
        <Box pb={10} maxH="93vh">
          <Markdown>{topics.current[currTopic]}</Markdown>
        </Box>
      </Flex>
    </>
  );
}
