'use client'

import React, { useState } from 'react'

//react icons
import { FaSearch } from "react-icons/fa";
import { useSearch } from '../context/searchContext';


function SearchInput() {
  const {setSearchInput} = useSearch()
  const [localSearch, setLocalSearch] = useState('')

  //search handler
  const searchHandleClick = () => {
    setSearchInput(localSearch)
  }
  return (
    <div className="ml-auto mr-auto w-fit flex gap-4 items-center relative">
      <input 
        className="text-gray-400 text-lg w-72 h-10 pl-2 pr-12 py-5 rounded bg-black border border-red-500 focus:outline-none" 
        type="text" 
        name="search" 
        placeholder="Search by name..."
        onChange={(e)=> setLocalSearch(e.target.value)}
      />
      <FaSearch
        onClick={searchHandleClick}
        className="absolute right-4 h-6 text-red-500 cursor-pointer hover:text-red-700"
        size={20}
      />
    </div>
  )
}

export default SearchInput