import React from 'react';
import Footer from './Footer';
import Nav from './Nav';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';

export default function Layout({ children }) {
  return (
    <div>
      <Nav />
      <GlobalStyles />
      <Typography />
      <p>{children}</p>
      <Footer />
    </div>
  );
}
