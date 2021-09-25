/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import '../styles/index.scss';
import '../styles/btn-submit.scss';
import '../styles/btn-search.scss';
import '../styles/track-info.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
export default MyApp;
