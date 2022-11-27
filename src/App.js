import React from 'react';
import { auth } from './firebase-config.js';
import SignIn from './components/SignIn.jsx';
import { useAuthState } from 'react-firebase-hooks/auth';
import InitializeUser from './components/InitializeUser.jsx';

function App() {
  const [user] = useAuthState(auth);

  return <>{user ? <InitializeUser /> : <SignIn />}</>;
}

export default App;
