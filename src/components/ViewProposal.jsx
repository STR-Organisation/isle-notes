import React, { useEffect, useState } from 'react';
import {
  Divider,
  Flex,
  HStack,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';
import NotificationBadge from './NotificationBadge';
import { getKeyByValue, getProposalURL, SUBJECT_SHORTHAND } from '../utils';
import { DownloadIcon, EditIcon } from '@chakra-ui/icons';
import { BsEye, BsTrash } from 'react-icons/bs';
import { Link as RouterLink } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function ViewProposal({ proposal, onDelete, ...props }) {
  const { status, className, topic, id, fileName } = proposal;

  const [fileURL, setFileURL] = useState();

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

  useEffect(() => {
    const initializeFileURL = async () => {
      if (!fileName) return;
      setFileURL(await getProposalURL(fileName));
    };
    initializeFileURL();
  }, []);

  return (
    <>
      <Flex
        w="50ch"
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
            <RouterLink to={`/view/${id}`}>
              <Button size="sm" colorScheme={'gray'} leftIcon={<BsEye />}>
                View
              </Button>
            </RouterLink>
            {!!fileName && (
              <a href={fileURL} download>
                <Button
                  colorScheme={'messenger'}
                  leftIcon={<DownloadIcon />}
                  size="sm"
                >
                  Download
                </Button>
              </a>
            )}
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
