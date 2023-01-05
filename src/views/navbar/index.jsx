import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faRightToBracket, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import CartToggle from './components/CartToggle.jsx';
import SearchBar from './components/SearchBar'
import ptBR from '../../assets/pt-BR.svg'
import enUS from '../../assets/en-US.svg'
import useLocationListener from '../../hooks/useLocationListener';
import { usePreferences } from '../../hooks/usePreferences';


const Navbar = () => {
  const isOnCheckout = useLocationListener()
  const {language, setLanguage} = usePreferences()

  const cartSize = useSelector(state=>state.cart.quantity)
  const {user, signOut} = useAuth();

  const navbar = useRef(null)

  const scrollHandler = () => {
    if (navbar.current && window.screen.width > 480) {
      if (window.pageYOffset >= 50) {
        navbar.current.classList.add('fixed', 'animate-slide');
        navbar.current.classList.remove('absolute', 'h-24');
      } else {
        navbar.current.classList.remove('fixed', 'animate-slide');
        navbar.current.classList.add('absolute', 'h-24');
      }
    }
  };


  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    scrollHandler()
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  function toggleLang() {
    language=='en-US'?setLanguage({language: 'pt-BR'}):setLanguage({language:'en-US'})
  }
  return(
    <>
        <nav id='navbar' ref={navbar} 
            className='absolute top-0 z-50 p-2
             overflow-hidden bg-black
             w-full h-24 flex justify-between'>

                {/*LEFT (Logo + langMenu)*/}
                <div className='flex w-fit justify-start md:w-fit md:justify-start gap-2 md:gap-6 px-5 min-w-max'>
                    <Link to='../' className='p-auto m-auto'>
                      <h1
                        className='font-bold text-white antialiased font-sans text-3xl'
                        >
                          N  I  E  H  S
                      </h1>
                    </Link>
                    <div id='langicon' className='my-auto h-full'
                      onClick={toggleLang}>
                        <img className='object-contain w-8 h-full' src={language=='en-US'?enUS:ptBR} alt='flag'/>
                    </div>
                </div>

                {/*RIGHT (Search + Auth + Cart)*/}
                <div className='hidden md:flex justify-end h-full max-w-[500px] lg:max-w-full gap-6 px-5 '>
                  <SearchBar />

                  {!user?.currentUser?
                  <>
                    <Link to='../login' 
                      className='auth-button w-max-content'>
                      <FontAwesomeIcon icon={faRightToBracket} size="lg" className='my-auto'/>
                      <span className='my-auto'>Entrar</span>  
                    </Link>
                    <Link to='../register' 
                      className='auth-button w-max-content'> 
                      <FontAwesomeIcon icon={faUserPlus} size="lg" className='my-auto'/>
                      <span className='my-auto'>Registrar</span>  
                    </Link>
                  </>
                  :<button onClick={()=>signOut(user)} 
                    className='auth-button w-max-content'>
                    <FontAwesomeIcon icon={faRightToBracket} size="lg" flip='horizontal' className='my-auto' />
                    <span className='my-auto'>Sair</span>  
                  </button>}

                  <CartToggle>
                    {({ onClickToggle }) => (
                    <div id='cart-toggle' className='h-full w-[10%]'>
                      <div className='h-full relative right-1/2 translate-x-1/2'
                        onClick={isOnCheckout?null:onClickToggle}>
                        <FontAwesomeIcon icon={faCartShopping} size='2xl' color={`${isOnCheckout?'gray':'white'}`} className='absolute top-1/2 -translate-y-1/2'/>
                        <span className={`${isOnCheckout?'hidden':'absolute'} top-1/2 left-1/2 -translate-y-[140%] translate-x-[40%] rounded-full bg-red-600 w-5 h-5 p-0 m-0 text-white text-lg text-center`}>
                          {cartSize}
                        </span>
                      </div>
                    </div>)
                    }
                  </CartToggle>
                </div>

                <button className='flex justify-end md:hidden h-full px-5 gap-6'>
                  
                  <div className={`${isOnCheckout?'hidden':'static'}`}>
                    <Link to='../cart' id='cart-link'>
                        <div className='h-full relative -left-8'
                          disabled={isOnCheckout}>
                          <FontAwesomeIcon icon={faCartShopping} color='white' size='2xl' 
                          className='absolute top-1/2 -translate-y-1/2'/>
                          <span className={`absolute top-1/2 left-1/2 -translate-y-[140%] translate-x-[100%] rounded-full bg-red-600 w-5 h-5 p-0 m-0 text-white text-lg text-center`}>
                            {cartSize}
                          </span>
                        </div>
                    </Link>
                  </div>
                  <Link to='../options' className='my-auto' id='cart-link'>
                      <FontAwesomeIcon  icon={faBars} size='2xl' color='white'/>
                  </Link>
                </button>
        </nav>
    </>
    );
};



export default Navbar;
