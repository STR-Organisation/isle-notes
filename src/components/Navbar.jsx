import {
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signInWithGoogle, db } from '../firebase-config';
import ProfilePhoto from './ProfilePhoto';
import { CgLogOut } from 'react-icons/cg';
import { BsFillPersonFill } from 'react-icons/bs';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { ALL_SUBJECT_ROUTES } from '../utils';

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState();
  const userProfileRef = collection(db, 'userProfile');

  const Logout = () => {
    auth.signOut();
  };

  useEffect(() => {
    const getData = async () => {
      const q = query(userProfileRef, where('uid', '==', user.uid));
      const data = await getDocs(q);
      setProfile(data.docs.map(doc => ({ ...doc.data() })));
    };
    getData();
  }, [user]);

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
        color="white"
        bgColor="tomato"
      >
        <RouterLink to={'/'}>
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
            {profile ? (
              <Menu>
                <MenuButton fontWeight={'semibold'} mr={5}>
                  My Subjects
                </MenuButton>
                <MenuList color="black">
                  {profile[0]?.classes.map((e, idx) => {
                    return (
                      <RouterLink
                        key={idx}
                        to={`/notes/${ALL_SUBJECT_ROUTES[e]}`}
                      >
                        <MenuItem>{e}</MenuItem>
                      </RouterLink>
                    );
                  })}
                </MenuList>
              </Menu>
            ) : (
              <Spinner mr={5} />
            )}
            <Menu>
              <MenuButton>
                <ProfilePhoto mr={10} photoURL={user.photoURL} />
              </MenuButton>
              <MenuList color={'black'}>
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
