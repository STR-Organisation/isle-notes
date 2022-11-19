import {
  ChakraProvider,
  ColorModeScript,
  theme as chakraTheme,
} from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={chakraTheme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
