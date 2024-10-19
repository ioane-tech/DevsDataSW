
import axios from 'axios'
import { toast } from 'react-toastify'

const FetchSpecies = async(apiUrl:string) => {
    try{
        const response = await axios.get(apiUrl)
        if(response.status === 200){
            return (response.data.name)
        }
    }catch(err){
        toast.error('failed fetching species!')
    }
  
  return 'None'
}

export default FetchSpecies