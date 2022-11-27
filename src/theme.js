import { extendTheme } from '@chakra-ui/react';

// test
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });
export default theme;
