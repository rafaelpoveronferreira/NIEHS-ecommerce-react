import withCheckout from "../../../hooks/withCheckout"
import { SERVER, STRIPE_PK } from '../../../global/constants'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import { useState } from "react"
import { useEffect } from "react"
import CheckoutForm from "./CheckoutForm"
import axios from "axios"


const stripePromise = loadStripe(STRIPE_PK)

const PaymentForm = ({cart, user, currentStep, setCurrentStep, shippingDetails, clientSecret, setClientSecret, }) => {

    // Está funcionando exceto pela função de update caso PI client secret já exista no mongo BD
    // é necessário reorganizar esse código, reduzi-lo e torná-lo mais legível
    useEffect(()=>{
        const verifyAlreadyExistsPI = async() => {
          try {
            const PI = clientSecret?clientSecret:'pi_null'
            const alreadyExists = await axios.get(SERVER+'/order/find/pi/'+PI, {withCredentials:true})
            stripePayment(alreadyExists.data.length>0)
            
          } catch (error) {
            console.log('error'+error)
          }

        }

        const stripePayment = async(alreadyExists) => {
          const items = cart.products.map(e => e.price*e.quantity)
          var stripe_client_secret;

          const orderToDispatch = {userId: user._id,
            products: cart.products.map(e=>{return {productId: e.id, quantity:e.quantity}}),
            amount: cart.total,
            name: shippingDetails.fullname,
            email: shippingDetails.email,
            stripe_client_secret: clientSecret,
            address: shippingDetails.address
            }

          if(!alreadyExists) {
            try {
              await fetch(SERVER+"/stripe/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items }),
              })
                .then((res) => res.json())
                .then((data) => {
                  stripe_client_secret= data.clientSecret;
                  setClientSecret(data.clientSecret)});
                  
                orderToDispatch.stripe_client_secret=stripe_client_secret

                const newOrder = await axios.post(SERVER+'/order/', orderToDispatch, {withCredentials:true})

            } catch (error) {
                console.log(error)
                setClientSecret(null)
                setCurrentStep(currentStep-1)
            }    
              
          } else {
            try {
              const {stripe_client_secret, ...others} = orderToDispatch 
              const updatedOrder = await axios.put(SERVER+'/order/update/'+clientSecret,others, {withCredentials:true})
            } catch (error) {
              console.log(error)
            }
          }
        }

        verifyAlreadyExistsPI()
        
    },[])

    const appearance = {
        theme: 'stripe',
      };
    
    const options = {
        clientSecret,
        appearance,
      };

    if(!shippingDetails) {
        setCurrentStep(currentStep-1)
    }

    return(
        <>
        <div className="h-[calc(100vh_-_6rem)]">
          {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm currentStep={currentStep} setCurrentStep={setCurrentStep} setClientSecret={setClientSecret}/>
          </Elements>
          )}
        </div>
        </>
    )
}

export default withCheckout(PaymentForm)