import React from 'react';
import { Divider, Flex, Text } from '@chakra-ui/react';
import NotificationBadge from '../components/NotificationBadge';
import { CloseIcon } from '@chakra-ui/icons';

export default function ProposalNotification({
  title,
  className,
  status,
  onClose,
  ...props
}) {
  return (
    <>
      <Flex p={4} flexDir="column" position={'relative'} {...props}>
        <CloseIcon
          position={'absolute'}
          top={'15%'}
          left={'90%'}
          fontSize={'x-small'}
          cursor="pointer"
          onClick={onClose}
        />
        <Text maxW="17ch">{title}</Text>
        <Text fontSize={'13'} color="gray.500">
          {className}
        </Text>
        <NotificationBadge text={status} />
      </Flex>
      <Divider />
    </>
  );
}
