import React from 'react'
import Cart from './views/cart/index';
import Navbar from './views/navbar/index';
import Footer from './common/components/Footer';
import { Outlet } from 'react-router-dom';
import useLocationListener from './hooks/useLocationListener';


const App = () => {
    useLocationListener()

    return (     
      <>
        <Navbar />
          <Cart mobile={false}/>
          <Outlet />
        <Footer />
      </>
    );
};


export default App;
