import { Link } from "react-router-dom"
import withCheckout from "../../../hooks/withCheckout"
import CartItems from "../../cart/components/CartItems"

const OrderSummary = ({currentStep, setCurrentStep, cart, changeQuantity, removeProduct}) => {
    return(
        <>
            <div
                className='md:w-1/2 lg:w-3/4 h-4/5 scrollbar overflow-hidden
                flex flex-col m-auto text-center justify-start'>
                <h3>Resumo do pedido</h3>
                <h2>Revise os itens</h2>
                <CartItems products={cart.products} changeQuantity={changeQuantity} removeProduct={removeProduct} />
                <div className="w-full flex justify-between my-5">
                    <Link to='../products' className="gray-400-button">
                        Voltar às compras</Link>
                    <button className="black-button" onClick={()=>setCurrentStep(currentStep+1)}>
                        Continuar</button>
                </div>
            </div>
        </>
    )
}

export default withCheckout(OrderSummary)