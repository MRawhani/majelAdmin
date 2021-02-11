import axios from 'axios';
import authService from './auth-service'
//import {toast} from 'react-toastify'
class AxiosInstance {
    
    constructor(){
        this.initInstance();
    }
    axiosInstance ={};

    initInstance =()=>{
        this.axiosInstance = axios.create({
            baseURL:'',
           
        })

        this.axiosInstance.interceptors.request.use(
            (config)=>{
                const token = authService.getToken();
                if(token){
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config
            }
        )
                
// this.axiosInstance.interceptors.response.use(null, error => {
//     const expectedError =
//       error.response &&
//       error.response.status >= 400 &&
//       error.response.status < 500;
  
//     if (!expectedError) {
      
//      toast.error("An unexpected error occurrred.");
//     }
// })

        return this.axiosInstance;
    }

    getInstance = ()=>{
        return this.axiosInstance || this.initInstance();
    }
}


export default new AxiosInstance();