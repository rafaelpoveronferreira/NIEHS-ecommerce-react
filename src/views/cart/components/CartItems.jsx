import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { usePreferences } from '../../../hooks/usePreferences';
import moneyMask from '../../../utils/moneyMask'
import { useCart } from '../../../hooks/useCart';

const CartItems = ({products, changeQuantity, removeProduct}) => {
    const {language} = usePreferences()
    const {changeSize} = useCart()

    function handleSizeChange(e, id, color) {
        changeSize({size: e.target.value, id, color})
    }

    return(
        <>
        {products.map((product,i)=>(
                <div key={i}
                className='border-b border-gray-400 border-solid
                p-3 py-4 gap-10 sm:gap-0
                flex flex-col sm:flex-row justify-start'>
                    <div className='flex justify-center sm:justify-end'>
                        <FontAwesomeIcon onClick={()=>removeProduct({id:product.id, quantity:product.quantity, color:product.color, price:product.price})}
                                icon={faX}
                                size='xl'
                                className="fa-plus fa-solid
                                p-2 my-auto text-red-700
                                bg-gray-200 hover:bg-gray-300
                                border border-solid border-gray-400"/>

                        <img src={product.src}
                        className='object-contain w-16 h-16' />
                        <div className="px-3 flex flex-col justify-start items-start">
                            <h3>{product.title[language]}</h3>
                            <h4>{moneyMask(product.price, language)}</h4>
                        </div>
                    </div>

                    <div className="justify-center sm:justify-end sm:ml-auto flex flex-row-reverse sm:flex-row gap-4">
                        <form className="my-auto flex gap-4">
                            <select className='p-2' name="size" value={product.size} 
                                onChange={(e)=>{handleSizeChange(e, product.id, product.color)}}>
                                {product.allsizes.map((size, i)=>
                                <option key={i} value={size} >
                                    {size}
                                </option>)}
                            </select>
                            <input disabled={true} value={product.quantity}
                            className="text-sm text-center p-1 max-w-[50px]
                            bg-gray-100 hover:bg-gray-300
                            border border-solid border-gray-400" />
                        </form>
                        <div className="flex flex-col gap-1">
                            <FontAwesomeIcon onClick={()=>changeQuantity({id:product.id, quantity:1, color:product.color, price:product.price})}
                            icon={faPlus}
                            size='xl'
                            className="fa-plus fa-solid
                            px-3
                            bg-gray-200 hover:bg-gray-300
                            border border-solid border-gray-400"/>
                            <FontAwesomeIcon id='remove-or-subtract-item'
                             onClick={()=>product.quantity<=1?
                                removeProduct({id:product.id, quantity:product.quantity, color:product.color, price:product.price}):
                                changeQuantity({id:product.id, quantity:-1, color:product.color, price:product.price})}
                            icon={product.quantity<=1?faTrash:faMinus} 
                            size='xl'
                            className={
                            `${product.quantity<=1?'bg-red-500 hover:bg-red-700'
                            :
                            'bg-gray-200 hover:bg-gray-300'} 
                            px-3 duration-200 ease-in
                            
                            border border-solid border-gray-400`}/>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default CartItems