import StepTracker from './components/StepTracker'
import CheckoutStep1 from "./components/CheckoutStep1"
import CheckoutStep2 from "./components/CheckoutStep2"
import CheckoutStep3 from "./components/CheckoutStep3"
import { useState } from "react"
import useResetScroll from '../../hooks/useResetScroll'
import useVerifyToken from '../../hooks/useVerifyToken'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../hooks/useModal'
import Modal from "../../common/components/Modal";
import { useAuth } from '../../hooks/useAuth'
import { useEffect } from 'react'

const Order = () => {
    useResetScroll();

    const {user, signOut} = useAuth();
    const navigateTo = useNavigate()
    const {isOpenModal, closeModal, openModal} = useModal();

    if(user?.currentUser) {
        useVerifyToken()
            .then(isTokenValid=>{
                if(!isTokenValid){
                    openModal()
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }

    useEffect(()=>{
        if(!isOpenModal && !user?.currentUser) {
            navigateTo('login')
        }
    })



    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = [1,2,3]


    const [shippingDetails, setShippingDetails] = useState(null)
    
    return (
        <>
            <Modal isOpen={isOpenModal} onRequestClose={closeModal}>
                <p>Sessão Expirada. Por favor refaça o login.</p>
                <br />
                <div className="flex justify-center">
                    <button onClick={()=>{closeModal();signOut(user);}} 
                        className="black-button" >
                        Entrar novamente
                    </button>
                </div>
            </Modal>

            <div className="h-max mt-24 py-6 lg:px-40 ">
                <StepTracker count={currentStep} totalSteps={totalSteps}/>
                <br /><br />
                {1==currentStep?
                    <CheckoutStep1 currentStep={currentStep} 
                        setCurrentStep={setCurrentStep}/>
                    :null}
                {2==currentStep?
                    <CheckoutStep2 currentStep={currentStep} 
                        setCurrentStep={setCurrentStep} setShippingDetails={setShippingDetails}/>
                    :null}
                {3==currentStep?
                    <CheckoutStep3 currentStep={currentStep} 
                        setCurrentStep={setCurrentStep} shippingDetails={shippingDetails}/>
                    :null}         
            </div>
        </>
    )

}

export default Order
