import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

export default function CenteredSpinner() {
  return (
    <>
      <Flex w="100%" justify={'center'}>
        <Spinner color="messenger.500" />
      </Flex>
    </>
  );
}
