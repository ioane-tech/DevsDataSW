import axios from "axios"
import { toast } from "react-toastify"

export const FetchHomeWorld = async (homeWorld:string): Promise<string> =>{
    try{
        const response = await axios.get(homeWorld)
        if(response.status == 200){
            return response.data.name;
        }
    }catch(err){
        toast.error('Failed fetching homeWorld!')
    }
    
    return 'None'
}