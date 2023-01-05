import { useSelector, useDispatch } from 'react-redux'
import { setShipping, setPayment, setPaymentIntent } from '../redux/orderSlice';


export const useOrder = () => {
    const order = useSelector(state => state.order );
    const {clientSecret} = order
    const dispatch = useDispatch();
  
    const setShippingDetails = (payload) => {
        dispatch(setShipping(payload))
    }

    const setPaymentDetails = (payload) => {
        dispatch(setPayment(payload))
    }

    const setClientSecret = (payload) => {
        dispatch(setPaymentIntent(payload))
    }

    return { order, setShippingDetails, setPaymentDetails, clientSecret, setClientSecret}
}
