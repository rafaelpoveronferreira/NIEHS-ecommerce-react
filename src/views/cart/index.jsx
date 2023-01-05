import React from "react";
import { useCart } from "../../hooks/useCart";
import { useAuth } from '../../hooks/useAuth'
import { useModal } from '../../hooks/useModal'
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../common/components/Modal";
import CartItems from "./components/CartItems";

const Cart = ({mobile}) => {
    const { cart, removeProduct, changeQuantity, closeCart } = useCart();
    const {products, quantity, total} = cart;

    const { user } = useAuth();
    
    const {isOpenModal, closeModal, openModal} = useModal();
    
    const navigateTo = useNavigate()

    function handleCheckout() {
        if(user.currentUser) {
            closeCart()
            navigateTo('../checkout');
        } else {
            openModal()
        }
    }

    return (
        <>
        <Modal isOpen={isOpenModal} onRequestClose={closeModal}>
            <p>Você precisa entrar para concluir o pedido</p>
            <br />
            <div className="flex justify-center gap-8">
                <button onClick={closeModal} className="p-3 px-5 text-white bg-gray-700 hover:bg-black" >
                    Voltar às compras
                </button>
                <Link to='../login' onClick={() => {closeModal();closeCart();}} className="p-3 px-5 text-white bg-gray-700 hover:bg-black" >
                    Entrar
                </Link>
            </div>
        </Modal>
        <div id='cart'
        className={`${mobile?
        'mobile-full-page'
        :
        'translate-x-full overflow-scroll scrollbar fixed top-0 right-0 p-5 h-full w-1/2 z-50 bg-gray-100 border-l border-solid border-gray-400 shadow-black duration-1000 ease'}`}>

            <div className="border-b border-solid border-gray-400">
               <h3 className="text-align">Your Bag</h3>
            </div>

            <CartItems products={products} changeQuantity={changeQuantity} removeProduct={removeProduct}/>
            
            {products.length>0?
            <div className="text-right p-5">Total: $ {total}</div>
            :
            <div className="text-center text-gray-300 p-5">No products</div>}

            <div className="flex p-5 justify-end items-center 
                ">
                <button disabled={products.length<=0}
                    onClick={handleCheckout}
                    className={`px-5 py-3 font-semibold
                    ${products.length<=0?'cursor-not-allowed gray-400-button':'black-button'} 
                    text-white`}>
                    Checkout Now
                </button>
            </div>

        </div>
        </>
    )
};

export default Cart;