import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import PhotographerHome from './Pages/PhotographerHome/PhotographerHome';

function App() {

  return (
    <>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<PhotographerHome/>}/>
        </Routes>
      </BrowserRouter>
      

    </div>
    </>
  );
}

export default App;
