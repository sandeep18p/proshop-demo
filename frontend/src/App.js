import { Container } from 'react-bootstrap';
import React from 'react';
import Header from './components/Header';
import MyNavbar from './components/Hello';
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Loader from './components/Loader';
import { useLoginMutation } from './slices/userApiSlice';
import { setCredentials } from './slices/authSlice';
import {toast} from 'react-toastify'; 

const App = () => {
  return (
    <>
      <Header />
    
      <main className='py-3'>
        <Container>
          {/* <h1>Welcome to Proshop</h1> */}
          <Outlet/>
        </Container>
      </main>
     <Footer/>
     <ToastContainer/>
    </>
  );
};

export default App;
