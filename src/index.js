import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.js';
import theme from './theme.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProfilePage from './routes/ProfilePage';
import Notes from './routes/Notes';
import SubjectNotes from './routes/SubjectNotes';
import './index.css';
import ProposeNotes from './routes/ProposeNotes.jsx';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/notes',
    element: <Notes />,
  },
  {
    path: '/notes/:subject',
    element: <SubjectNotes />,
  },
  {
    path: '/notes/propose',
    element: <ProposeNotes />,
  },
]);

root.render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
