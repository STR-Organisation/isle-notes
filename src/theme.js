import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      hoverDark: '#0f0f0f',
      darkGray: '#000000',
      lightGray: '#010409',
      bgcolor1: '#ffffff',
      bgcolor2: '#f6f7fb',
      lightBorderColor: '#ebebeb',
      darkBorderColor: '#21262d',
      hoverLight: '#f5f5f5',
      primaryAccent: '#fe599d',
      primaryAccentGradient: '#f30096',
      secondaryAccent: '#00a8ff',
      secondaryAccentGradient: '#31d6dc',
      tertiaryAccent: '#f8680a',
      tertiaryAccentGradient: '#fa8d37',
      accentHighlight: '#f30096',
      lightAccent: '#ffedf6',
    },
  },
  components: {
    Button: {
      variants: {
        primary: _ => ({
          rounded: 'md',
          color: 'white',
          backgroundColor: 'brand.secondaryAccent',
          _hover: {
            backgroundColor: 'brand.secondaryAccentGradient',
          },
        }),
      },
    },
    IconButton: {
      variants: {
        primary: _ => ({
          rounded: 'none',
          color: 'white',
          backgroundColor: 'brand.secondaryAccent',
          _hover: {
            backgroundColor: 'brand.secondaryAccentGradient',
          },
        }),
      },
    },
  },
});
export default theme;
