import React from 'react';
import { Outlet } from 'react-router'
import './App.css';
import Banner from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Banner/>
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  )
}

export default App;
