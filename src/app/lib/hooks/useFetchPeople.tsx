'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { PeopleResponse } from '../types'


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
            console.error(err)
            setPeopleDataLoading(false)
        }
        
    })

    useEffect(()=>{
        if(apiUrl){
            FetchPeopleData()
        }
    },[apiUrl])
    
    console.log(peopleData)
    return {peopleData, peopleDataLoading, FetchPeopleData}
}

export default useFetchPeople