import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';
import Error from './Error';
import Loading from './Loading';
import moneyMask from '../../utils/moneyMask.js';
import { usePreferences } from '../../hooks/usePreferences.js';
import { COLORSTOCSSCLASSES } from '../../global/constants.js';


const Products = ({products, filteredColor, filteredSize, isLoading, error}) => {
    return( 
        <>
        {error?
        <Error value={error.message}/>
        :
        isLoading?
        <Loading />
        :
        <ul
        className='grid w-full m-auto grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5'>
            {products?.length>0?               
            products.map((e) => {
                    return (
                        <Product
                            key={e._id}
                            item={e}
                            filteredColor={filteredColor}
                            filteredSize={filteredSize}
                        />
                        )
                    })
            :<Error value={'Nenhum produto nesta categoria'} />
            }
        </ul>
        }
        </>
    )
    };

const Product = ({item, filteredColor}) => {
    const [selectedColor, setSelectedColor] = useState(filteredColor?filteredColor:item.color[0])
    const {language} = usePreferences()

    useEffect(()=> {
        if (filteredColor && item.color.includes(filteredColor)) {
            setSelectedColor(filteredColor)
        }
    }, [filteredColor])
    
    function handleColorChange(e) {
        setSelectedColor(e.target.attributes.name.value)
    }

    return (
        <li
            className='duration-300 ease-in
                        border border-solid border-gray-200
                        flex-initial
                        text-center 
                        relative
                        flex flex-col justify-center items-center
                        aspect-product w-48
                        mx-auto'>

            {/* Img with link aspect ratio for the img is: 0.43462897526 after:opacity-0 after:hover:opacity-100*/}
            <Link to={`product/${item._id}/?color=${selectedColor}`}
                  className="group
                             h-[80%] w-full text-ellipsis overflow-hidden
                             relative justify-center
                             ease-in duration-300
                             ">
                <img className='ease-in duration-300
                                absolute w-full h-full top-0 left-0 z-10
                                group-hover:scale-110
                                object-contain'
                    src={new URL(`/src/assets/products/${item._id}_1_${selectedColor}.webp`, import.meta.url).href}/>
                <div className='ease-in duration-300
                                bg-[rgba(0,0,0,0.2)]  opacity-0 group-hover:opacity-100
                                absolute w-full h-full top-0 left-0 z-20'/>
            </Link>

            {/* Color options */}
            <div id='select-color'
                 className='whitespace-nowrap overflow-x-hidden h-[15%] 
                    absolute z-40 bottom-16
                    w-full px-4 flex gap-2'>
                {item.color.map((e,i)=>
                    <div key={i}
                        name={e}
                        onClick={handleColorChange}
                        className={`w-7 h-7 cursor-pointer ${COLORSTOCSSCLASSES[e]} 
                            rounded-full border border-gray-700 shadow-xl
                            ${selectedColor!=e?'opacity-60':'opacity-100'} hover:opacity-100`}
                    />
                )}
            </div>

            {/* Title and Price */}
            <div  className='whitespace-nowrap py-1 h-[10%] w-full flex flex-col'>
                <h4 className='overflow-hidden text-ellipsis font-mono px-4'>{item.title[language]}</h4>
                <span className='overflow-hidden text-ellipsis text-lg px-4'>Price: {moneyMask(item.price, 'en-US')}</span>
            </div>
            
            {/* Add to cart/wishlist buttons */}
            <div className='flex justify-around
                            bg-white
                            flex-initial h-[10%] w-full
                            '>
                <Icon id='add-to-cart' icon={faCartShopping} 
                    iconColor='hover:text-green-500'
                    item={item} selectedColor={selectedColor} imgSrc={`../src/assets/products/${item._id}_1_${selectedColor}.webp`}/>
                <Icon id='add-to-wishlist' icon={faHeart} 
                    iconColor='hover:text-red-500' />
            </div>

        </li>
    )
};

const Icon = ({icon, id, hoverCSS, item, selectedColor, imgSrc, iconColor}) => {
    const {isItemOnCart, addNewProduct, changeQuantity} = useCart()
    return (
        <FontAwesomeIcon icon={icon} size='xl' id={id}
            className={`${icon} 
                        whitespace-nowrap overflow-hidden text-clip
                        after:text-sm after:font-sans
                        ${hoverCSS} after:duration-1000 after:ease-in
                        hover:scale-105 hover:text-center ${iconColor}
                        flex-1 hover:flex-[2]
                        hover:bg-[#202020] 
                        m-auto p-auto py-[0.83rem]
                        duration-300 ease-in`}
            onClick={()=>isItemOnCart(item._id, selectedColor)?
                changeQuantity({id: item._id, price: item.price, color: selectedColor, quantity: 1})
                :
                addNewProduct({id: item._id, title: item.title, price: item.price, color: selectedColor, stock: item.stock, allsizes: item.size, size: item.size[0], src: imgSrc})} /> 
    )
}

export default Products;