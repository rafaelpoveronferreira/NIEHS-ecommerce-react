import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"
import { useCart } from "./useCart"
import { useOrder } from "./useOrder"

function withCheckout(Component) {
    function ComponentWithProp(props) {
    const {cart, changeQuantity, removeProduct} = useCart()
    const {user} = useAuth()

    const {clientSecret, setClientSecret} = useOrder()

    const navigateTo = useNavigate()

    if (!user?.currentUser) {navigateTo('login')}
    else if(cart?.products.length==0) {navigateTo('../')}

    return(
        <>
        <Component 
            {...props}
            user={user.currentUser}
            cart={cart}
            changeQuantity={changeQuantity}
            removeProduct={removeProduct}
            setClientSecret={setClientSecret}
            clientSecret={clientSecret}
            />
        </>
    )
}
    return ComponentWithProp
}

export default withCheckout