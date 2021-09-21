import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout';

const Home: NextPage = () => (

  <div>
    <Head>
      <title>Spotify tracker</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <nav className="nav" />
    <main className="main">
      <Layout />
    </main>
    <footer className="footer" />
  </div>
);

export default Home;
