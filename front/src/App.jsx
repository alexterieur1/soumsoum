import React from 'react';
import { Outlet } from 'react-router'
import './App.css';
import Banner from './components/Header'

function App() {
  return (
    <>
      <Banner />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App;
