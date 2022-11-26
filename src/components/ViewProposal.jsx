import React from 'react';
import { Divider, Flex, HStack, Button, Text } from '@chakra-ui/react';
import NotificationBadge from './NotificationBadge';
import { getKeyByValue, SUBJECT_SHORTHAND } from '../utils';
import { EditIcon } from '@chakra-ui/icons';
import { BsEye, BsTrash } from 'react-icons/bs';

export default function ViewProposal({ proposal }) {
  const { status, className, topic, id } = proposal;

  return (
    <>
      <Flex
        w="45ch"
        h={'13vh'}
        border="1px"
        borderColor={'gray.200'}
        m={2}
        borderRadius="lg"
        p={3}
        cursor="pointer"
        flexDir={'column'}
      >
        <Text fontSize={'md'} fontWeight="semibold">
          {topic}
          <NotificationBadge ml={1} mb={1} text={status} />
        </Text>
        <Text fontSize={'sm'} color="gray.500">
          {getKeyByValue(SUBJECT_SHORTHAND, className)}
        </Text>
        <Divider />
        <Flex flexDir={'column'} align="center" h="100%">
          <HStack mt={3}>
            <Button size="sm" leftIcon={<BsEye />}>
              View
            </Button>
            <Button size={'sm'} leftIcon={<EditIcon />}>
              Edit
            </Button>
            <Button size="sm" leftIcon={<BsTrash />}>
              Delete
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </>
  );
}
