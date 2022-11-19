import {
  ChakraProvider,
  ColorModeScript,
  theme as chakraTheme,
} from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

root.render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={chakraTheme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
