import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { getKeyByValue, SUBJECT_SHORTHAND } from '../utils';
import TopicText from '../components/TopicText';
import Markdown from '../components/Markdown';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
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
    default: `/notes/${subject}`,
  });

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
      data.forEach(proposal => {
        const { topic, note } = proposal.data();
        topics.current[topic] = note;
        topicRoutes.current[topic] = `/notes/propose/edit/${proposal.id}`;
      });
    };
    fetchProposals();
  }, [subject]);

  return (
    <>
      <Navbar />
      {isOrganizer && (
        <ButtonGroup position="absolute" bottom="2%" right="2%">
          <RouterLink to={topicRoutes.current[currTopic]}>
            <IconButton icon={<EditIcon />} colorScheme="messenger" />
          </RouterLink>
          <IconButton
            fontSize="xs"
            icon={<CloseIcon />}
            colorScheme="messenger"
          />
        </ButtonGroup>
      )}
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
            fontSize={'lg'}
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
        <Markdown>{topics.current[currTopic]}</Markdown>
      </Flex>
    </>
  );
}
