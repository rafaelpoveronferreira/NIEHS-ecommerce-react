import React from "react";
import Cover from "./components/Cover.jsx";
import Categories from "./components/Categories.jsx";
import Products from "../../common/components/Products";
import useResetScroll from '../../hooks/useResetScroll'
import useFeatured from "../../hooks/useFeatured.js";

const Home = () => {
  useResetScroll();
  
  const {featuredProducts, isLoading, error} = useFeatured();

      return (     
        <>
          <div className='w-full h-24'/>
          <Cover />
          <div className="mx-8 lg:mx-24 min-h-[665px] md:h-[calc(100vh_-_6rem)] flex flex-col justify-center">
            <h3 className="relative  text-center font-mono mt-6 after-underline-header">PRODUTOS EM DESTAQUE</h3>
            <Products products={featuredProducts}
              isLoading={isLoading}
              error={error}/>
          </div>
          <div className='flex flex-col justify-center mb-8'>
            <h3 className="text-center font-mono relative after-underline-header">CONFIRA NOSSAS REDES</h3>
            <Categories />
          </div>
        </>
      );
  };
  
  export default Home;