import React from "react";
import { useState, useRef } from "react";
import { Link, Navigate, redirect } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

import { EMAILREGEX } from "../../global/constants";
import { useAuth } from "../../hooks/useAuth";
import useResetScroll from '../../hooks/useResetScroll'
import * as Yup from 'yup'
import { Field, Form, Formik } from "formik";
import CustomInput from '../../common/components/CustomInput';

const FormSchema = Yup.object().shape({
    userOrEmail: Yup.string()
        .required('Username or email is required.')
        .min(2, 'User or email must be at least 2 characters long.')
        .max(60, 'User or email must only be less than 60 characters.'),
    password: Yup.string()
        .required('Password')
        .min(5, 'Password must be at least 5 characters long.')
        .max(20, 'Password must only be less than 20 characters.'),
  });

const Login = () => {
    useResetScroll();
    
    //const [userOrEmail, setUserOrEmail] = useState(null)
    //const [password, setPassword] = useState(null)

    const passwordInput = useRef(null);
    const userInput = useRef(null);

    const {user, login} = useAuth();

    const initFormikValues = {
        userOrEmail: '',
        password: ''
    }

    function onSubmitForm(e) { 
        const {userOrEmail, password} = e;
        if(EMAILREGEX.test(userOrEmail)) {
            login({email: userOrEmail, password})
        } else {
            login({username: userOrEmail, password})
        }
    }

    return(
        <>
        {(user?.currentUser && !user?.error) && <Navigate to='/'/>}
        <div className="w-full h-24"/>

        <section className="
         min-h-screen m-auto my-16 h-screen
         w-2/3 xl:w-1/2">

            <div className="h-[800px] sm:h-[365px] gap-0
                flex flex-col sm:flex-row justify-around
                border border-solid border-gray-400">

                <div className="flex-initial h-1/2 w-full sm:h-full sm:w-3/5 
                    sm:border-r border-b border-gray-400 
                    flex flex-col justify-around gap-8">
                <Formik
                    initialValues={initFormikValues}
                    validateOnChange
                    validationSchema={FormSchema}
                    onSubmit={onSubmitForm}
                    >
                    {()=>
                    <Form>
                        <h3 className="h-1/5 text-3xl w-full mx-6">Login</h3>
                        <br />
                        <div className="flex flex-col justify-between h-4/5 ml-8 mr-6">
                            <Field type="text"
                                name="userOrEmail"
                                label="Nome completo"
                                placeholder="Enter your full name"
                                component={CustomInput}/>
                            <Field type="text"
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                                component={CustomInput}/>
                            <div className="flex flex-row justify-around w-full">
                                <Link to={'../recover-password'} className='text-xs text-gray-400 my-auto'>
                                    Esqueceu a Senha?</Link>
                                <button className="black-button" type="submit"
                                    disabled={user.isLoading}>Entrar</button>
                            </div>
                        </div>
                    </Form>
                    }
                </Formik>
            </div>


            <div className="flex-initial h-1/2 w-full sm:h-full sm:w-2/5 
                text-lg sm:text-md md:text-lg lg:text-lg xl:text-xl
                bg-gray-200
                flex flex-col justify-center gap-8">
                <a href="" className="flex flex-col overflow-hidden items-center gap-2">
                    <FontAwesomeIcon size='2x' icon={faFacebook}/>
                    <span className="text-center whitespace-nowrap">Entre com Facebook</span>
                </a>
                <a href="" className="flex flex-col overflow-hidden items-center gap-2">
                    <FontAwesomeIcon size='2x' icon={faGithub}/>
                    <span className="text-center whitespace-nowrap">Entre com Github</span>
                </a>
                <a href="" className="flex flex-col overflow-hidden items-center gap-2">
                    <FontAwesomeIcon size='2x' icon={faTwitter}/>
                    <span className="text-center whitespace-nowrap">Entre com Twitter</span>
                </a>
            </div>
            </div>
        </section>
        
        </>
        
    )
}

export default Login;