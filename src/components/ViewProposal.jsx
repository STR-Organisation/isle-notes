import React from 'react';
import {
  Divider,
  Flex,
  HStack,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';
import NotificationBadge from './NotificationBadge';
import { getKeyByValue, SUBJECT_SHORTHAND } from '../utils';
import { EditIcon } from '@chakra-ui/icons';
import { BsEye, BsTrash } from 'react-icons/bs';
import { Link as RouterLink } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function ViewProposal({ proposal, onDelete, ...props }) {
  const { status, className, topic, id } = proposal;

  const toast = useToast();

  const deleteProposal = async () => {
    if (status === 'approved') {
      toast({
        title: 'Delete Failed',
        description: 'Cannot delete approved proposal',
        status: 'error',
        duration: 3000,
        position: 'bottom-left',
      });
      return;
    }
    onDelete();

    const docRef = doc(db, 'proposals', id);
    await deleteDoc(docRef);

    toast({
      title: 'Delete Successful',
      status: 'success',
      duration: 3000,
      position: 'bottom-left',
    });
  };

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
        _hover={{
          transform: 'scale(1.03)',
        }}
        transition="all 200ms ease"
        cursor="pointer"
        flexDir={'column'}
        {...props}
      >
        <Text fontSize={'md'} fontWeight="semibold">
          {topic}
          <NotificationBadge ml={1.5} mb={1} text={status} />
        </Text>
        <Text fontSize={'sm'} color="gray.500">
          {getKeyByValue(SUBJECT_SHORTHAND, className)}
        </Text>
        <Divider />
        <Flex flexDir={'column'} align="center" h="100%">
          <HStack mt={3}>
            <Button size="sm" colorScheme={'gray'} leftIcon={<BsEye />}>
              View
            </Button>
            <RouterLink to={`/notes/propose/edit/${id}`}>
              <Button colorScheme={'teal'} size={'sm'} leftIcon={<EditIcon />}>
                Edit
              </Button>
            </RouterLink>
            <Button
              size="sm"
              colorScheme={'red'}
              onClick={deleteProposal}
              leftIcon={<BsTrash />}
            >
              Delete
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </>
  );
}
