/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout';
import Nav from '../components/nav';
import Footer from '../components/footer';

const Home: NextPage = () => (

  <div className="main-container">
    <Head>
      <title>Spotify tracker</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Nav />
    <div className="main">
      <Layout />
    </div>
    <Footer />
  </div>
);

export default Home;
