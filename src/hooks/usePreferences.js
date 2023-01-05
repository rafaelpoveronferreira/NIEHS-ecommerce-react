import { useSelector, useDispatch } from 'react-redux'
import { setLanguage as sL } from '../redux/preferencesSlice'


export const usePreferences = () => {
    const language = useSelector(state => state.preferences.language );
    const dispatch = useDispatch();
  
    const setLanguage = (payload) => {
        dispatch(sL(payload))
    }


    return { language, setLanguage}
}
