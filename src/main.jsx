// Este projeto usa tailwind, mas também importa estilos adicionais em .scss para potenciais personalizações (ainda não utilizado)
import './styles/styles.css'

// React
import React from 'react'
import ReactDOM from 'react-dom/client'

// Components
import App from './App'
import Home from './views/home/index'
import Order from './views/checkout/index'
import Cart from './views/cart/index'
import MobileOptions from './views/options/index'
import Login from './views/login/index'
import Register from './views/register/index'
import Product from './views/product/index'
import ProductList from './views/productList/index'
import ErrorPage from './views/error/index'


// Componente Skeleton da biblioteca react-loading-skeleton
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// Redux
import { Provider } from 'react-redux'

// Redux-Persist
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from './redux/store'

// React Router
import { createBrowserRouter, RouterProvider, Route, redirect} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Home /> },
          {
            path: 'login',
            //loader: () => {
            //  return /niehsSessionToken=\w+/.test(document.cookie)?redirect('/'):null;
            //},
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          },
          {
            path: 'cart',
            element: <Cart mobile={true} />
          },
          {
            path: 'options',
            element: <MobileOptions />
          },
          {
            path: 'checkout',
            element: <Order />
          },
          {
            path: 'product/:id',
            element: <Product />
          },
          {
            path: 'products/:category',
            element: <ProductList />
          },
          {
            path: 'products/',
            element: <ProductList />
          }
      ]
      } 
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  
)

