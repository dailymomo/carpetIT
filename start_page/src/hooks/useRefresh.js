import useAuth from './useAuth';
import axios from '../api/axios';


const CHECKURL='/api/users/checkToken'

const useRefresh = () => {

    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get(CHECKURL,{headers:{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : JSON.parse(localStorage.getItem('accessToken'))}}
        );
        setAuth(prev => {
            return {
                user:JSON.parse(localStorage.getItem('user')),
                accessToken:JSON.parse(localStorage.getItem('accessToken'))
            }
        });
        return JSON.parse(localStorage.getItem('accessToken'));
    }
    return refresh;
}

export default useRefresh;