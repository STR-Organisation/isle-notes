import React from 'react';
import { auth } from './firebase-config.js';
import Home from './routes/Home.jsx';
import SignIn from './components/SignIn.jsx';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);

  return <>{user ? <Home /> : <SignIn />}</>;
}

export default App;
