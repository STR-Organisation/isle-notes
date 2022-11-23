import { Flex, Heading, Box } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { getKeyByValue, SUBJECT_SHORTHAND } from '../utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TopicText from '../components/TopicText';

export default function SubjectNotes() {
  const { subject } = useParams();

  const fullName = getKeyByValue(SUBJECT_SHORTHAND, subject);

  const markdown = `
  # **Topic 1**
  This is *some* **markdown**.
  ~~Welcome~~ to [https://reactjs.com](https://google.com)
  `;

  const sampleTopics = [
    'Photosynthesis',
    'Organic Chemistry',
    'The Central Dogma',
  ];

  return (
    <>
      <Navbar />
      <Flex w="100%" justify={'center'}>
        <Heading>{fullName}</Heading>
      </Flex>
      <Flex
        borderRight="1px"
        borderRightColor={'gray.200'}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        borderTop={'1px'}
        borderTopColor={'gray.200'}
        align="center"
        flexDir={'column'}
      >
        {sampleTopics.map((e, idx) => {
          return <TopicText key={idx}>{e}</TopicText>;
        })}
      </Flex>
    </>
  );
}
