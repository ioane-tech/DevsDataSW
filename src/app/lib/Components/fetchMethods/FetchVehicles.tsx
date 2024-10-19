
import axios from 'axios'
import { toast } from 'react-toastify'

const FetchVehicles = async(apiUrl:string) => {
    try{
        const response = await axios.get(apiUrl)
        if(response.status === 200){
            return (response.data.name)
        }
    }catch(err){
        toast.error('failed fetching vehicles!')
    }
  
  return 'None'
}

export default FetchVehicles