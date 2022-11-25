import React from 'react';
import { Divider, Flex, Text } from '@chakra-ui/react';
import NotificationBadge from '../components/NotificationBadge';

export default function ProposalNotification({ title, className, status }) {
  return (
    <>
      <Flex p={4} flexDir="column">
        <Text>{title}</Text>
        <Text fontSize={'13'} color="gray.500">
          {className}
        </Text>
        <NotificationBadge text={status} />
      </Flex>
      <Divider />
    </>
  );
}
