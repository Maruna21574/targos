import React from 'react';
import { Helmet } from 'react-helmet-async';

const HomeMeta: React.FC = () => (
  <Helmet>
    <title>TARGOŠ – stavebné práce | Rekonštrukcie, novostavby, elektroinštalácie</title>
    <meta name="description" content="Stavebná firma TARGOŠ – rekonštrukcie bytov, domov, novostavby, elektroinštalácie, férové ceny a odborný tím." />
    <meta property="og:title" content="TARGOŠ – stavebné práce" />
    <meta property="og:description" content="Stavebná firma TARGOŠ – rekonštrukcie bytov, domov, novostavby, elektroinštalácie, férové ceny a odborný tím." />
    <meta property="og:image" content="/images/og_home.jpg" />
    <meta property="og:url" content="https://targos.sk/" />
    <link rel="canonical" href="https://targos.sk/" />
    <meta name="robots" content="index, follow" />
  </Helmet>
);

export default HomeMeta;
