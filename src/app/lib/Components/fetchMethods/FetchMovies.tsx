
import axios from 'axios'

const FetchMovies = async(apiUrl:string) => {
    try{
        const response = await axios.get(apiUrl)
        if(response.status === 200){
            return (response.data.title)
        }
    }catch(err){
        console.error(err)
    }
  
  return 'None'
}

export default FetchMovies