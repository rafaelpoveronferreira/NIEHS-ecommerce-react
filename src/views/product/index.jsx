import React from "react";
import { useDispatch } from 'react-redux';
import useResetScroll from '../../hooks/useResetScroll'
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import useProduct from "../../hooks/useProduct";
import Thumbnail from "./components/Thumbnail";
import Loading from "../../common/components/Loading";
import { COLORSTOCSSCLASSES, SIZES } from "../../global/constants";
import { useCart } from "../../hooks/useCart";
import moneyMask from "../../utils/moneyMask";
import { usePreferences } from "../../hooks/usePreferences";

const Product = () => {
    useResetScroll();

    // Get ID and selected color from URL
    const pathname = useLocation().pathname
    const id = pathname.split('/').slice(-2)[0]
    const colorFromLink = useLocation().search.split('=').slice(-1)[0]

    // Call custom hook to GET a single product from MongoDB
    const { product, imgRange, isLoading, error } = useProduct(id);

    // custom hooks
    const { isItemOnCart, addNewProduct, changeQuantity} = useCart()
    const {language} = usePreferences()
    
    // Seleções do usuário são manejadas por state. selectedImgIndex equivale ao index
    // da thumbnail que está sendo exibida também como imagem principal
    const [selectedImgIndex, setSelectedImgIndex] = useState(1)
    const [selectedColor, setSelectedColor] = useState(colorFromLink)
    const [selectedSize, setSelectedSize] = useState(null)
    const imgSrc = `../../src/assets/products/${id}_${selectedImgIndex}_${selectedColor}.webp`

    // Cria array de índices para ser utilizado em função .map() durante renderização
    const imgArrayRange = [...Array(imgRange+1).keys()].slice(1);
    
    return(
        <main className="mt-24 py-8">       
            {isLoading?
            <Loading />
            :
            /*CONTAINER*/
            <div className="m-auto
                            w-4/5 h-[calc(100vh_-_10rem)] min-h-[950px] md:min-h-[calc(100vh_-_10rem)]
                            flex flex-col md:flex-row justify-center
                            rounded-md border border-solid border-gray-300">
                
                {/*THUMBNAILS*/}
                <div className="flex-initial order-2 md:order-1
                                scrollbar overflow-scroll overflow-y-hidden md:overflow-x-hidden md:overflow-y-scroll 
                                h-1/5 min-h-[100px] md:min-h-full md:h-full md:w-2/12">
                   <div className="flex flex-row md:flex-col">
                        {product?
                            imgArrayRange.map((i)=>
                                <Thumbnail
                                id={id}
                                key={i}
                                img={i}
                                color={selectedColor}
                                setSelectedImgIndex={setSelectedImgIndex} 
                                />)
                            :<img src='../../src/assets/loading.gif'/>
                        }
                   </div>
                </div>

                {/*MAIN IMAGE*/}
                <div className="flex-initial order-1 md:order-2
                                flex justify-center
                                h-2/5 md:h-full md:w-5/12
                                bg-gray-200">
                    <img src={imgSrc}
                        className='pr-6 pl-2 
                        object-contain duration-300 ease-in'/>
                </div>

                {/*TITLE, DESC, COLOR, SIZE, BASKET*/}
                <div className="flex-initial order-3 md:order-3
                                flex flex-col items-center md:items-start justify-between 
                                overflow-hidden text-ellipsis
                                p-6 py-12 lg:text-xl
                                h-3/5 md:h-full md:w-5/12 ">
                    
                    <div className="flex flex-col items-center md:items-start">
                    {/*TÍTULO*/}
                    <h2 className="lg:text-4xl text-ellipsis whitespace-nowrap">{product?<>{product.title[language]}</>:<Skeleton count={1}/>}</h2>
                    
                    {/*DESCRIÇÃO*/}
                    <h4 className="lg:text-2xl">{product?<>{product.desc[language]}</>:<Skeleton count={2}/>}</h4>
                    </div>
                    {/*COR*/}
                    <div className="lg:scale-110 lg:pl-5 md:mt-0 mt-8">
                        <span>Cor:</span>
                        <div className="flex flex-row justify-start gap-6 ml-2">
                        {product?
                        <>{product.color.map((e)=>
                            <ColorOption
                            key={e}
                            color={e}
                            bgColor={COLORSTOCSSCLASSES[e]}
                            setSelectedColor={setSelectedColor}/>
                        )}</>
                        :
                        <Skeleton circle count={1}/>}
                        </div>
                    </div>

                    {/*TAMANHO*/}
                    <div className="lg:scale-110 lg:pl-5 lg:text-lg md:my-0 my-8">
                        <span>Tamanho:</span>
                        <SizeOptions
                            product={product}
                            selectedSize={selectedSize}
                            setSelectedSize={setSelectedSize}
                        />
                    </div>

                    {/*PREÇO*/}
                    <div className="flex justify-center items-center lg:text-xl">
                        <h3>
                            {product?<>{moneyMask(product.price, 'en-US')}</>:<Skeleton count={1}/>}
                        </h3>
                    </div>

                    {/*ADD TO CART*/}
                    <div className="flex justify-center items-center ">
                        <button
                        className="black-button"
                        onClick={()=>isItemOnCart(id, selectedColor)?
                            changeQuantity({id:product._id, price: product.price, color: selectedColor, quantity:1})
                            :
                            addNewProduct({id:product._id, title: product.title, price: product.price, color: selectedColor, stock: product.stock, allsizes: product.size, size: selectedSize?selectedSize:product.size[0], src: imgSrc})}
                            >Add to Basket
                            </button>
                    </div>
                </div>

            </div>
            }
        </main>
    )
}

const ColorOption = (props) => {
    return(
        <div
        className={`${props.bgColor}
         cursor-pointer
         opacity-70 hover:opacity-90 duration-200 ease-in
         rounded-full w-10 h-10 
         border-2 border-solid border-gray-700`}
        onClick={()=>props.setSelectedColor(props.color)}
        />
        )
}

const SizeOptions = (props) => {
    return(
        <div className="flex flex-row justify-start gap-6 md:gap-2 lg:gap-6 text-center items-center">
        {props.product?
            <>
            {SIZES.map(eachPossibleSize => 
                <div key={eachPossibleSize}
                className={`
                    rounded-md border border-gray-700 
                    text-xs p-1
                    cursor-pointer
                    ${props.selectedSize?eachPossibleSize==props.selectedSize?'bg-gray-300':'bg-white':'bg-white'}
                    ${props.product.size.some((availableSize)=>availableSize==eachPossibleSize)?'border-solid':'border-dashed'} 
                    p-auto w-12 h-8`}
                onClick={props.product.size.some((availableSize)=>availableSize==eachPossibleSize)?()=>props.setSelectedSize(eachPossibleSize):()=>{}}
                >{eachPossibleSize}</div>)
            }
            </>
        :
        <Skeleton count={1}/>}
        </div>

    )
}

export default Product;