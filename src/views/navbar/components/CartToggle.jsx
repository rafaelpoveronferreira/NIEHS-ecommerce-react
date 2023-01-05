import { useLocation } from "react-router-dom";

const CartToggle = ({ children }) => {
  const {pathname} = useLocation()

  const onClickToggle = () => {
    if (document.getElementById('cart').classList.contains('translate-x-full') 
      && pathname != '/cart') {
      document.getElementById('cart').classList.remove('translate-x-full')
      document.getElementById('cart').classList.add('shadow-2xl')
    } else {
        document.getElementById('cart').classList.add('translate-x-full')
        document.getElementById('cart').classList.remove('shadow-2xl')
    }
  };

  document.addEventListener('click', (e) => {
    const isClickingInsideCart = e.target.closest('#cart');
    const isClickingOnCartOpenButton = e.target.closest('#cart-toggle');
    const isClickingOnAddToCart = e.target.closest('#add-to-cart');
    const isClickingOnSelectColor = e.target.closest('#select-color');
    const isClickingOnRemoveItem = e.target.closest('#remove-or-subtract-item')
    const isClickingOnModalOverlay = e.target.closest('.ReactModalPortal')
    const isCartClosed = document.getElementById('cart').classList.contains('translate-x-full')
    
    if (!isClickingInsideCart
      && !isClickingOnCartOpenButton
      && !isClickingOnAddToCart
      && !isClickingOnSelectColor
      && !isClickingOnRemoveItem
      && !isClickingOnModalOverlay
      && !isCartClosed
      && pathname != '/cart') {
      document.getElementById('cart').classList.add('translate-x-full')
      document.getElementById('cart').classList.remove('shadow-2xl')
    }
  });

  return children({ onClickToggle });
};

export default CartToggle;