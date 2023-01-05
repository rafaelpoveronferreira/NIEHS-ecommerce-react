import axios from 'axios';
import { SERVER } from '../global/constants';

const useVerifyToken = async(data) => {
    try {
        const res = await axios.post(SERVER+'/auth/verifyToken', data, {withCredentials: true})
        console.log(res.response.status)
        return true
    } catch (error) {
        if(error?.response?.status == 401) {
            return false
        } else {return error}
    }
}

export default useVerifyToken