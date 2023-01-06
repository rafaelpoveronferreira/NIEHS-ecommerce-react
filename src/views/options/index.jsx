import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faRightToBracket, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useResetScroll from '../../hooks/useResetScroll'
import SearchBar from "../navbar/components/SearchBar";

const Options = () => {
    useResetScroll();
    
    const user = useSelector(state=>state.user)

    return(
        <section className="h-[calc(100vh_-_6rem)] mt-24 py-12 w-full flex flex-col gap-10 justify-around items-center bg-gray-100">
            <div className="h-1/3 w-full flex justify-center items-center ">
                <SearchBar />
            </div>
            {!user?.currentUser?
                  <>
                    <Link to='login' 
                      className='w-full h-1/3 flex justify-center items-center gap-8 text-xl'>
                      <FontAwesomeIcon icon={faRightToBracket} size="lg" className='my-auto'/>
                      <span className='my-auto'>Entrar</span>  
                    </Link>
                    <Link to='register' 
                      className='w-full h-1/3 flex justify-center items-center gap-8 text-xl'> 
                      <FontAwesomeIcon icon={faUserPlus} size="lg" className='my-auto'/>
                      <span className='my-auto'>Registrar</span>  
                    </Link>
                  </>
                  :<button onClick={()=>signOut(user)} 
                    className='w-full h-1/3 flex justify-center items-center gap-8 text-xl'>
                    <FontAwesomeIcon icon={faRightToBracket} size="lg" flip='horizontal' className='my-auto' />
                    <span className='my-auto'>Sair</span>  
                  </button>}
        </section>
    )
}

export default Options;