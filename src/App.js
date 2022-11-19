import React from 'react';
import { Navbar } from './components/Navbar';
import { auth } from './firebase-config';
import Home from './routes/Home';
import SignIn from './components/SignIn';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Navbar />
      {user ? <Home /> : <SignIn />}
    </>
  );
}

export default App;
