import { Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
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
      <Grid h="85vw" templateColumns="repeat(5, 1fr)" mt={2} gap={2}>
        <GridItem colSpan={1} bg="tomato">
          <Flex w="100%" h="100%" flexDir={'column'} align="center">
            {sampleTopics.map((e, idx) => {
              return <TopicText>{e}</TopicText>;
            })}
          </Flex>
        </GridItem>
        <GridItem colSpan={4} fontSize="xl">
          <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
        </GridItem>
      </Grid>
    </>
  );
}
