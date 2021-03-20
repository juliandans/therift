import '../styles/globals.css'
import { ColorModeSwitcher } from '../lib/ColorModeSwitcher';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ColorModeSwitcher />
      <ColorModeScript />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp
