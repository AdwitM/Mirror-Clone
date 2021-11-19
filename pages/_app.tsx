import '../styles/globals.css';

import React from 'react';
import {Web3Provider} from '@/context/web3Context';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MyApp = ({Component, pageProps, err}) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Web3Provider>
      {getLayout(<Component {...pageProps} err={err} />)}
    </Web3Provider>
  );
};

export default MyApp;
