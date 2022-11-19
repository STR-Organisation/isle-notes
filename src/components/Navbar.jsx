import { Flex, Link, Spacer } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-config';
import ProfilePhoto from './ProfilePhoto';

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const Logout = () => {
    auth.signOut();
  };

  return (
    <>
      <Flex
        align={'center'}
        width="100vw"
        height={'7vh'}
        position="sticky"
        as="header"
        borderBottomWidth={'1.5px'}
        mb={'2'}
      >
        <RouterLink href={'/'}>
          <Link ml={5} fontWeight="bold" fontSize={'2xl'}>
            All-in-All
          </Link>
        </RouterLink>
        <Spacer />
        {!user && (
          <RouterLink href="/login">
            <Link mr="5">Login</Link>
          </RouterLink>
        )}
        {user && (
          <>
            <ProfilePhoto mr={5} photoURL={user.photoURL} />
            <Link mr={5} onClick={Logout}>
              Logout
            </Link>
          </>
        )}
      </Flex>
    </>
  );
};
