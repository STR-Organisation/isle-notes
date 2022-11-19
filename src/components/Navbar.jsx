import {
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signInWithGoogle } from '../firebase-config';
import ProfilePhoto from './ProfilePhoto';
import { CgLogOut } from 'react-icons/cg';
import { BsFillPersonFill } from 'react-icons/bs';

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
          <Link mr="5" onClick={signInWithGoogle}>
            Login
          </Link>
        )}
        {user && (
          <>
            <Menu>
              <MenuButton>
                <ProfilePhoto mr={10} photoURL={user.photoURL} />
              </MenuButton>
              <MenuList>
                <RouterLink to="/profile">
                  <MenuItem icon={<BsFillPersonFill />}>Account</MenuItem>
                </RouterLink>
                <MenuItem icon={<CgLogOut />} onClick={Logout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </Flex>
    </>
  );
};
