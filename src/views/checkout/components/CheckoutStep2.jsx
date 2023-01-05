import { Form, Formik } from "formik"
import withCheckout from "../../../hooks/withCheckout"
import ShippingForm from "./ShippingForm"
import * as Yup from 'yup'

const FormSchema = Yup.object().shape({
    fullname: Yup.string()
      .required('Full name is required.')
      .min(2, 'Full name must be at least 2 characters long.')
      .max(60, 'Full name must only be less than 60 characters.'),
    email: Yup.string()
      .email('Email is not valid.')
      .required('Email is required.'),
    address: Yup.string()
      .required('Shipping address is required.'),
    mobile: Yup.object()
      .shape({
        country: Yup.string(),
        countryCode: Yup.string(),
        dialCode: Yup.string().required('Mobile number is required'),
        value: Yup.string().required('Mobile number is required')
      })
      .required('Mobile number is required.'),
    isInternational: Yup.boolean(),
    isDone: Yup.boolean()
  });
  

const ShippingDetails = ({user, clientSecret, setClientSecret, currentStep, setCurrentStep, setShippingDetails}) => {
    const initFormikValues = {
        fullname: user.username || '',
        email: user.email || '',
        address: '',
        mobile: ''
    }

    const onSubmitForm = async (form) => {
        const { fullname, email, address, mobile} = form

        setShippingDetails({
            fullname,
            email,
            address,
            mobile
        })
        

        setCurrentStep(currentStep+1)  
    } 

    return(
        <div className="h-[calc(100vh_-_6rem)]">
        <Formik
            initialValues={initFormikValues}
            validateOnChange
            validationSchema={FormSchema}
            onSubmit={onSubmitForm}
          >
            {() => (
              <Form>
                <ShippingForm/>
                <div className="w-full flex justify-between">
                  <button className="gray-400-button"
                    onClick={()=>setCurrentStep(currentStep-1)}>
                    Voltar
                  </button>
                  <button className="black-button"
                    type="submit">
                    Continuar
                  </button>
                </div>
              </Form>
            )}
        </Formik>
        </div>
    )
}

export default withCheckout(ShippingDetails)