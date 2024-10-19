'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { PeopleResponse } from '../types'
import { toast } from 'react-toastify'


function useFetchPeople(apiUrl:any) {
    const [peopleData, setPeopleData] = useState<PeopleResponse>()
    const [peopleDataLoading, setPeopleDataLoading] = useState(false)

    const FetchPeopleData = (async()=>{
        setPeopleDataLoading(true)
        try{
            const response = await axios.get(apiUrl)
            if(response.status === 200){
                setPeopleData(response.data)
                setPeopleDataLoading(false)
            }
        }catch(err){
            toast.error('failed fetching people! refresh page!')
            setPeopleDataLoading(false)
        }
        
    })

    useEffect(()=>{
        if(apiUrl){
            FetchPeopleData()
        }
    },[apiUrl])
    
    return {peopleData, peopleDataLoading, FetchPeopleData}
}

export default useFetchPeople