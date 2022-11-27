import { Heading, Flex, Button, Divider, Text, Link } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  formatEmail,
  getKeyByValue,
  getProposalURL,
  SUBJECT_SHORTHAND,
} from '../utils';
import { DownloadIcon } from '@chakra-ui/icons';
import { BsEye } from 'react-icons/bs';
import { Link as RouterLink } from 'react-router-dom';

export default function PendingProposal({
  proposal,
  approve,
  reject,
  ...props
}) {
  const { className, topic, email, id, fileName } = proposal;

  const [fileURL, setFileURL] = useState();

  useEffect(() => {
    const getFileURL = async () => {
      if (!fileName) return;
      setFileURL(await getProposalURL(fileName));
    };
    getFileURL();
  }, []);

  return (
    <>
      <Flex
        flexDir={'column'}
        border="1px"
        p={4}
        marginBlock={2}
        borderColor="gray.200"
        borderRadius={'lg'}
        minW="40vw"
        {...props}
      >
        <Heading fontSize={'lg'}>
          {getKeyByValue(SUBJECT_SHORTHAND, className)}: {topic}
        </Heading>
        <Text fontSize={'sm'} color="gray.500">
          Proposed By {formatEmail(email)}
        </Text>
        <Divider mt={2} />
        <Flex w={'100%'} justify={'space-evenly'} mt={4}>
          <RouterLink to={`/aia-website/view/${id}`}>
            <Button w="12ch" leftIcon={<BsEye />}>
              View
            </Button>
          </RouterLink>
          {fileName && (
            <Link href={fileURL} download>
              <Button
                ml={2}
                colorScheme={'messenger'}
                leftIcon={<DownloadIcon />}
                w="15ch"
              >
                Download
              </Button>
            </Link>
          )}
          <Button
            ml={2}
            colorScheme={'green'}
            w={'12ch'}
            onClick={() => {
              approve(id, proposal);
            }}
          >
            Approve
          </Button>
          <Button
            ml={2}
            bgColor="red.300"
            color="white"
            w={'12ch'}
            onClick={() => {
              reject(id, proposal);
            }}
            _hover={{
              bgColor: 'red.500',
            }}
          >
            Reject
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
