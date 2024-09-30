import React from 'react';
import Head from "./Head";
import Footer from "./Footer";
import Menu from './Menu';
export default function Layout({ children }) {
  return (
    <div>
      <Head />
      <Menu/>
      {children}
      <Footer />
    </div>
  );
}