import { StateProvider } from '../context/StateContext';
import Navbar from '../components/Layout/Navbar';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: #f8f9fa;
    color: #333;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <GlobalStyle />
      <Navbar />
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;