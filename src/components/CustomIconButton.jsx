import { IconButton } from '@chakra-ui/react';
import React from 'react';

export default function CustomIconButton({ icon }) {
  return (
    <IconButton
      icon={icon}
      bgColor={'brand.secondaryAccent'}
      color="white"
      _hover={{
        bgColor: 'brand.secondaryAccentGradient',
      }}
    />
  );
}
