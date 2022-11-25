import {
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, signInWithGoogle, db } from '../firebase-config';
import { CgLogOut } from 'react-icons/cg';
import { BsFillPersonFill } from 'react-icons/bs';
import { collection, query, where } from 'firebase/firestore';
import { SUBJECT_SHORTHAND } from '../utils';
import ProfilePhoto from './ProfilePhoto';

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const userProfileRef = collection(db, 'userProfile');
  const organizerRef = collection(db, 'organizers');

  let q, organizerQuery;
  if (user) {
    q = query(userProfileRef, where('uid', '==', user.uid));
    organizerQuery = query(organizerRef, where('uid', '==', user.uid));
  }

  const [profile] = useCollectionData(q, { idField: 'id' });
  const [organizer] = useCollectionData(organizerQuery);

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
        color="white"
        bgColor="tomato"
        zIndex={'overlay'}
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
              <>
                {organizer ? (
                  <>
                    {organizer[0].isOrganizer ? (
                      <Menu>
                        <MenuButton fontWeight={'semibold'} mr={5}>
                          Organizer
                        </MenuButton>
                        <MenuList color="black">
                          <RouterLink to="/organizer/approve">
                            <MenuItem>Manage Propositions</MenuItem>
                          </RouterLink>
                        </MenuList>
                      </Menu>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <Spinner mr={5} />
                )}
                <Menu>
                  <MenuButton fontWeight={'semibold'} mr={5}>
                    Contribute
                  </MenuButton>
                  <MenuList color="black">
                    <RouterLink to="/notes/propose">
                      <MenuItem>Propose Notes</MenuItem>
                    </RouterLink>
                  </MenuList>
                </Menu>
                <Menu>
                  <MenuButton fontWeight={'semibold'} mr={5}>
                    My Subjects
                  </MenuButton>
                  <MenuList color="black">
                    {profile[0]?.classes.map((e, idx) => {
                      return (
                        <RouterLink
                          key={idx}
                          to={`/notes/${SUBJECT_SHORTHAND[e]}`}
                        >
                          <MenuItem>{e}</MenuItem>
                        </RouterLink>
                      );
                    })}
                    <MenuDivider />
                    <RouterLink to="/notes">
                      <MenuItem>All Subjects</MenuItem>
                    </RouterLink>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <Spinner mr={5} />
            )}
            <Menu>
              <MenuButton>
                <ProfilePhoto src={user.photoURL} mr={10} />
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
