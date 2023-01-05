import { useSelector, useDispatch } from 'react-redux'
import { addNewProduct as newprod, removeProduct as remove, changeQuantity as changeqty, changeSize as changesz} from '../redux/cartSlice';


export const useCart = () => {
    const cart = useSelector(state => state.cart );
    const dispatch = useDispatch();
  
    const isItemOnCart = (id, color) => {
        return cart.products.some((e) => e.id === id) && cart.products.some((e) => e.color===color)
    }
  
    const addNewProduct = (payload) => {
        dispatch(newprod(payload))
    }

    const removeProduct = (payload) => {
        dispatch(remove(payload))
    }

    const changeQuantity = (payload) => {
        dispatch(changeqty(payload))
    }

    const changeSize = (payload) => {
        dispatch(changesz(payload))
    }

    const closeCart = () => {
        document.getElementById('cart').classList.add('translate-x-full');
    }

    return { cart, isItemOnCart, addNewProduct, removeProduct, changeQuantity, changeSize, closeCart}
}
