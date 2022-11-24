import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { getKeyByValue, SUBJECT_SHORTHAND } from '../utils';
import ReactMarkdown from 'react-markdown';
import TopicText from '../components/TopicText';
import remarkGfm from 'remark-gfm';
import './Markdown.css';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function SubjectNotes() {
  const { subject } = useParams();

  const fullName = getKeyByValue(SUBJECT_SHORTHAND, subject);

  const markdown = `
  
  ### Definitely ${fullName}

  *Testing* ~~my~~ our **markdown**:

  $$s = ut + \\frac{1}{2}at^2$$

  $$\\hat{v} = \\begin{pmatrix}1 \\\\ 3\\end{pmatrix}$$

  `;

  const sampleTopics = [
    'Photosynthesis',
    'Organic Chemistry',
    'The Central Dogma',
  ];

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
          <Heading mt={4} fontSize={'xl'} cursor="pointer">
            {fullName}
          </Heading>
          {sampleTopics.map((e, idx) => {
            return <TopicText key={idx}>{e}</TopicText>;
          })}
        </Flex>
        <div class="main">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={rehypeKatex}
            children={markdown}
          />
        </div>
      </Flex>
    </>
  );
}
