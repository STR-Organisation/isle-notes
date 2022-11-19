import {
  HStack,
  Flex,
  Heading,
  VStack,
  Input,
  Text,
  Divider,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import CustomCheckbox from '../components/CustomCheckbox';
import { Navbar } from '../components/Navbar';
import { auth } from '../firebase-config';

export default function ProfilePage() {
  const [classes, setClasses] = useState([]);

  return (
    <>
      <Navbar />
      <Flex w="100%" align={'center'} flexDir="column">
        <Heading fontSize={'3vw'}>
          Welcome, {auth.currentUser.displayName}!
        </Heading>

        <Divider w={'40vw'} mt={2} />

        <VStack align={'flex-start'} mt={2} w={'40vw'}>
          <Heading fontSize={'2vw'}>Basic Info</Heading>

          <HStack>
            <Text fontSize={'1.5vw'} w={'10ch'}>
              First Name{' '}
            </Text>
            <Input
              maxW={'20vw'}
              size="sm"
              fontSize={'1.5vw'}
              placeholder="Name"
            />
          </HStack>
          <HStack>
            <Text fontSize={'1.5vw'} w={'10ch'}>
              Last Name{' '}
            </Text>
            <Input
              maxW={'20vw'}
              size="sm"
              fontSize={'1.5vw'}
              placeholder="Name"
            />
          </HStack>
          <HStack>
            <Text fontSize={'1.5vw'} w={'10ch'}>
              Email{' '}
            </Text>
            <Input
              maxW={'20vw'}
              size="sm"
              fontSize={'1.5vw'}
              value={auth.currentUser.email}
              disabled={true}
            />
          </HStack>
        </VStack>

        <Divider w={'40vw'} mt={2} />
      </Flex>
    </>
  );
}
