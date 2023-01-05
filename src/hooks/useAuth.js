import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
//import { authRequest } from '../global/axiosInstances';
import { SERVER } from '../global/constants';
import { loginStart, loginSuccess, loginError, signOut as sO} from '../redux/authSlice';


export const useAuth = () => {
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const register = async (payload) => {
        dispatch(loginStart())

        try {
            const registeredUser = await axios.post(SERVER+'/auth/register', payload)
            
            const newUserToLogin = {username: registeredUser.data.username, password: payload.password}

            const loggedUser = await axios.post(SERVER+'/auth/login', newUserToLogin, {withCredentials:true})

            console.log(loggedUser)

            dispatch(loginSuccess(loggedUser.data))
            return true
        } catch (error) {
            console.log(error)
            dispatch(loginError())
        }
    }
    
    const login = async (payload) => {
        dispatch(loginStart())

        try {
            const loggedUser = await axios.post(SERVER+'/auth/login', payload, {withCredentials:true})
            
            console.log(loggedUser)
            dispatch(loginSuccess(loggedUser.data))
            return true
        } catch (error) {
            console.log(error)
            dispatch(loginError())
        }
    }

    const signOut = async (payload) => {
        try {
            const loggedOut = await axios(SERVER+'/auth/logout', {
                method: "post",
                withCredentials: true
              })

        } catch (error) {
            console.log(error)
        }
        dispatch(sO())
    
    }


    return { user, login, register, signOut}
}
