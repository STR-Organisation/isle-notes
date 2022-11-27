import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.js';
import theme from './theme.js';
import {
  createBrowserRouter,
  HashRouter,
  RouterProvider,
} from 'react-router-dom';
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

const router = createBrowserRouter([
  {
    path: '/aia-website',
    element: <App />,
  },
  {
    path: '/aia-website/home',
    element: <Home />,
  },
  {
    path: '/aia-website/profile',
    element: <ProfilePage />,
  },
  {
    path: '/aia-website/notes/:subject',
    element: <SubjectNotes />,
  },
  {
    path: '/aia-website/notes/propose',
    element: <ProposeNotes />,
  },
  {
    path: '/aia-website/organizer/approve',
    element: <ApprovalPage />,
  },
  {
    path: '/aia-website/notes/propose/edit/:id',
    element: <EditProposal />,
  },
  {
    path: '/aia-website/notes/propose/all',
    element: <AllProposals />,
  },
  {
    path: '/aia-website/view/:id',
    element: <View />,
  },
]);

root.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </>
);
