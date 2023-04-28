import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.js';
import theme from './theme.js';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import ProfilePage from './routes/ProfilePage';
import SubjectNotes from './routes/SubjectNotes';
import './index.css';
import ProposeNotes from './routes/ProposeNotes.jsx';
import ApprovalPage from './routes/ApprovalPage.jsx';
import EditProposal from './routes/EditProposal.jsx';
import AllProposals from './routes/AllProposals.jsx';
import View from './routes/View.jsx';
import Home from './routes/Home.jsx';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const router = createHashRouter(
  [
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/profile',
      element: <ProfilePage />,
    },
    {
      path: '/notes/:subject',
      element: <SubjectNotes />,
    },
    {
      path: '/notes/propose',
      element: <ProposeNotes />,
    },
    {
      path: '/organizer/approve',
      element: <ApprovalPage />,
    },
    {
      path: '/notes/propose/edit/:id',
      element: <EditProposal />,
    },
    {
      path: '/notes/propose/all',
      element: <AllProposals />,
    },
    {
      path: '/view/:id',
      element: <View />,
    },
  ],
  {
    basename: '/',
  }
);

root.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </>
);
