import React from 'react';
import { Image } from '@chakra-ui/react';

export default function ProfilePhoto({ photoURL, ...props }) {
  return (
    <>
      <Image
        src={photoURL || 'https://avatars.dicebear.com/api/bottts/123812.svg'}
        referrerPolicy="no-referrer"
        w={'40px'}
        h={'auto'}
        borderRadius="2vw"
        {...props}
      />
    </>
  );
}
