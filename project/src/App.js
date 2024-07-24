import React from 'react';
import './App.css';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import PhotographerHome from './Pages/PhotographerHome/PhotographerHome';
import ClientHome from './Pages/ClientHome/ClientHome';
import ClientPhotographerViewing from './Pages/ClientPhotographerViewing/ClientPhotographerViewing';
import PhotographerContact from './Pages/PhotographerContact/PhotographerContact';
import ClientContact from './Pages/ClientContact/ClientContact';
import ChoosePage from './Pages/ChoosePage/ChoosePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';

function App() {

  return (
    <>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/photographer/home" element={<PhotographerHome/>}/>
          <Route path="/photographer/contact" element={<PhotographerContact/>}/>
          <Route path="/client/home" element={<ClientHome/>}/>
          <Route path="/client/info" element={<ClientPhotographerViewing/>}/>
          <Route path="/client/contact" element={<ClientContact/>}/>
          <Route path="/choose" element={<ChoosePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
        </Routes>

      </BrowserRouter>
      

    </div>
    </>
  );
}

export default App;
