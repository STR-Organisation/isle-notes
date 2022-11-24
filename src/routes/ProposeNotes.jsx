import React from 'react';
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
} from '@chakra-ui/react';
import { SUBJECT_SHORTHAND } from '../utils';

export default function ProposeNotes() {
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
            <Select placeholder="Select class">
              {Object.entries(SUBJECT_SHORTHAND).map((v, idx) => {
                const [key, value] = v;
                return <option value={value}>{key}</option>;
              })}
            </Select>
          </HStack>
          <HStack>
            <Text fontWeight={'semibold'} fontSize="lg" w="10ch">
              Topic
            </Text>
            <Input placeholder="Type here..." />
          </HStack>
        </VStack>
        <Divider />
        <VStack>
          <Flex>
            <Heading fontSize="xl" color="tomato">
              Note Editor
            </Heading>
          </Flex>
          <Textarea w="50vw" h="30vh" />
        </VStack>
        <Button colorScheme={'red'}>Propose</Button>
      </Flex>
    </>
  );
}
