import { Flex, Heading } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { getKeyByValue, SUBJECT_SHORTHAND } from '../utils';
import TopicText from '../components/TopicText';
import Markdown from '../components/Markdown';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function SubjectNotes() {
  const { subject } = useParams();
  const [currTopic, setCurrTopic] = useState('default');

  const fullName = getKeyByValue(SUBJECT_SHORTHAND, subject);

  const proposalRef = collection(db, 'proposals');

  const q = query(
    proposalRef,
    where('status', '==', 'approved'),
    where('className', '==', subject)
  );

  const proposals = useCollectionData(q);

  const topics = useRef({
    default: `# ${fullName}`,
  });

  useEffect(() => {
    const fetchProposals = async () => {
      const data = await getDocs(q);
      data.forEach(proposal => {
        const { topic, note } = proposal.data();
        topics.current[topic] = note;
      });
    };
    fetchProposals();
  }, []);

  return (
    <>
      <Navbar />
      <Flex overflowX={'hidden'}>
        <Flex
          borderRight="1px"
          borderRightColor={'gray.200'}
          w={{ base: 'full', md: 60 }}
          pos="static"
          minH={'100vh'}
          borderTop={'1px'}
          borderTopColor={'gray.200'}
          align="center"
          flexDir={'column'}
        >
          <Heading
            mt={4}
            fontSize={'xl'}
            cursor="pointer"
            onClick={() => {
              setCurrTopic('default');
            }}
          >
            {fullName}
          </Heading>
          {Object.entries(topics.current).map((e, idx) => {
            const [key, _] = e;
            if (key === 'default') return <></>;
            return (
              <TopicText onClick={setCurrTopic} key={idx} textValue={key} />
            );
          })}
        </Flex>
        <Markdown>{topics.current[currTopic]}</Markdown>
      </Flex>
    </>
  );
}
