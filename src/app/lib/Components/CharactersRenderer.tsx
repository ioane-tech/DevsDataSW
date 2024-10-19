'use client'

import React, { useEffect, useState } from 'react'
import useFetchPeople from '../hooks/useFetchPeople'
import { Person } from '../types'

//icons
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Loading from './Loading';

function CharactersRenderer() {
    //states
    const [page, setPage] = useState(1)
    const [apiUrl, setApiUrl] = useState(`https://swapi.dev/api/people/?page=${page}`)

    const [showPopup, setShowPopup] = useState<boolean>(false)
    const [person, setPerson] = useState<Person | null>()
    const [showMore, setShowMore] = useState(false)

    //hooks
    const {peopleData, peopleDataLoading, FetchPeopleData} = useFetchPeople(apiUrl)


    //api url changer
    useEffect(()=>{
        setApiUrl(`https://swapi.dev/api/people/?page=${page}`)
    },[page])

    //popup handlers
    const handleCardClick = (person:any) => {
        setShowPopup(true)
        setPerson(person)    
    }
    const handleClosePopup = () => {
        setShowPopup(false)
        setPerson(null)
        setShowMore(false) 
    }

    //arrow handlers
    const nextHandler = () => {
        setPage((prev) => prev + 1)
    }
    const backHandler = () => {
        setPage((prev) => prev - 1)
    }

    
  return (
    <div>
        {/* characters names */}
       <div className="flex flex-wrap relative justify-center gap-4 mb-10 mt-10 ml-auto mr-auto  p-10 w-2/3 border border-gray-400 rounded">
            {peopleData?.results.map((person) => (
                <div
                    key={person.name}
                    className="text-center w-52 bg-gray-900 border border-red-400 rounded p-4 cursor-pointer hover:bg-black"
                    onClick={() => handleCardClick(person)}
                >
                    <h2 className='text-lg text-gray-400'>Name</h2>
                    <p className="text-base text-mainRed font-light">{person.name}</p>
                </div>
            ))}

            {/* next & prev buttons */}
            <>
                <FaArrowLeft 
                    onClick={peopleData?.previous ? backHandler : undefined} 
                    className={peopleData?.previous? 'arrows -left-5 top-1/3 cursor-pointer ' : 'arrows -left-5 top-1/3 cursor-not-allowed'}
                />
                <FaArrowRight 
                    onClick={peopleData?.next ? nextHandler : undefined} 
                    className={peopleData?.next? 'arrows -right-5 top-1/3 cursor-pointer' : 'arrows -right-5 top-1/3 cursor-not-allowed'}
                />
            </>

            {/* show loading */}
            {
                peopleDataLoading &&
                <Loading/>
            }

        </div>

        {/* Detailed popup */}
        {showPopup && person && (
            <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-40 flex justify-center items-center">
                <div className="bg-black text-gray-300 p-10 w-1/3 relative border-2 rounded-lg">
                    {/** close button */}
                    <button
                        className="absolute top-3 right-5 text-base text-gray-300 hover:text-red-500 transition duration-200"
                        onClick={handleClosePopup}
                    >
                        X
                    </button>
                    {/* header (name) */}
                    <h2 className="text-2xl text-center font-bold mb-4">{person.name}</h2>
                    {/* details */}
                    <div className="text-sm space-y-2">
                        <p><strong>Height:</strong> {person.height} cm</p>
                        <p><strong>Mass:</strong> {person.mass} kg</p>
                        <p><strong>Hair Color:</strong> {person.hair_color}</p>
                        <p><strong>Skin Color:</strong> {person.skin_color}</p>
                        <p><strong>Eye Color:</strong> {person.eye_color}</p>
                        <p><strong>Birth Year:</strong> {person.birth_year}</p>
                        <p><strong>Gender:</strong> {person.gender}</p>
                        <p><strong>Homeworld:</strong> {person.homeworld}</p>

                        {/* Show More Section */}
                        {showMore && (
                            <>
                                <p><strong>Films:</strong> {person.films.join(', ')}</p>
                                <p><strong>Species:</strong> {person.species.join(', ')}</p>
                                <p><strong>Vehicles:</strong> {person.vehicles.join(', ')}</p>
                                <p><strong>Starships:</strong> {person.starships.join(', ')}</p>
                            </>
                        )}
                    </div>
                    {/* Show More button */}
                    {
                        showMore?
                        (
                            <></>
                        )
                        :
                        (
                            <div
                                className="w-fit ml-auto mr-auto mt-6 py-2 px-10 border border-black bg-red-500 rounded text-black text-base hover:scale-110 hover:border-red-500 hover:bg-black hover:text-red-500 transition duration-200 cursor-pointer"
                                onClick={() => setShowMore(true)}
                            >
                                Show More
                            </div>
                        )
                    }
                </div>
            </div>
        )}
    </div>
  )
}

export default CharactersRenderer