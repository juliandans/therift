import '../styles/globals.css'
import { ColorModeSwitcher } from '../lib/ColorModeSwitcher';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider>
        <ColorModeSwitcher />
        <ColorModeScript />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp
