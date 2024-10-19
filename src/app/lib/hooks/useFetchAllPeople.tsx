'use client'

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import { Person } from "../types";

export const useFetchAllPeople = (url:string) => {
    const [allCharacters, setAllCharacters] = useState<Person[]>([])


      const fetchedAllCharacters = async (url:string)=>{
        try{
            const response = await axios.get(url)
            if (response.status !== 200) {
                throw new Error("Failed to fetch");
            }else{
                setAllCharacters((prev) => [...prev, ...response.data.results]);
                if (response.data.next) {
                fetchedAllCharacters(response.data.next);
                }
            }
        }catch(err){
            toast.error("Failed to fetch characters. Please try again later.")
        }    
      } 

      useEffect(()=>{
        fetchedAllCharacters(url)
      },[])
      
    
    return {allCharacters}
  };