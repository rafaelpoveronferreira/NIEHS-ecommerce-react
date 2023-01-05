import { useOrder } from './useOrder';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Um listener da URL que limpa o state que registra a order em edição
const useLocationListener = () => {
    const location = useLocation()
    const {setClientSecret} = useOrder()
    const isOnCheckout = location.pathname.includes('checkout')

    useEffect(()=>{
      if(!isOnCheckout) {
        console.log('limpar PI')
        setClientSecret(null)
      }
    },[location])

    return isOnCheckout
}

export default useLocationListener