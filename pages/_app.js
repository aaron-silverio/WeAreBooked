import Layout from '../components/Layout/Layout';
import '../styles/globals.css';

import { StateProvider } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  );
}

export default MyApp;