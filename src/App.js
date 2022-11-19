import { Button } from '@chakra-ui/react';
import React from 'react';
import { Navbar } from './components/Navbar';
import { signInWithGoogle } from './firebase-config';

function App() {
  return (
    <>
      <Navbar />
      <Button colorScheme={'red'} onClick={signInWithGoogle}>
        Sign In With Google
      </Button>
    </>
  );
}

export default App;
