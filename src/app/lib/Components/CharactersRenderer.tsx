'use client'

import React, { useEffect, useState } from 'react'
//types
import { Person } from '../types'

//icons
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

//components
import Loading from './Loading';

//fetch methods
import useFetchPeople from '../hooks/useFetchPeople'
import { FetchHomeWorld } from './fetchMethods/FetchHomeWorld';
import FetchMovies from './fetchMethods/FetchMovies';
import FetchSpecies from './fetchMethods/FetchSpecies';
import FetchVehicles from './fetchMethods/FetchVehicles';
import FetchStarships from './fetchMethods/FetchStarships';
import { useSearch } from '../context/searchContext';

import { toast } from 'react-toastify';
import { useFetchAllPeople } from '../hooks/useFetchAllPeople';



function CharactersRenderer() {
    //states
    const [page, setPage] = useState(1)
    const [apiUrl, setApiUrl] = useState(`https://swapi.dev/api/people/?page=${page}`)

    const [homeWorld, setHomeWorld] = useState<string>()
    const [complexDetails, setComplexDetails] = useState({
        films: [] as string[],
        species: [] as string[],
        vehicles: [] as string[],
        starships: [] as string[],
    });
    const [loadingComplexData, setLoadingComplexData] = useState<boolean>(false)

    const [filteredCharacters, setFilteredCharacters] = useState<Person[] | undefined>()
    const [paginatedFilteredCharacters, setPaginatedFilteredCharacters] = useState<Person[]>()

    const [showPopup, setShowPopup] = useState<boolean>(false)
    const [person, setPerson] = useState<Person | null>()
    const [showMore, setShowMore] = useState(false)

    //hooks
    const {peopleData, peopleDataLoading} = useFetchPeople(apiUrl)
    const {searchInput} = useSearch()
    const {allCharacters} = useFetchAllPeople('https://swapi.dev/api/people/?page=1')


    //search function
    useEffect(()=>{
        setPage(1)
        if (searchInput.length > 0) {
            const filtered = allCharacters?.filter((person: Person) =>
                person.name.toLowerCase().includes(searchInput.toLowerCase())
            );
            setFilteredCharacters(filtered);
        } else {
            setFilteredCharacters(undefined);
        }
    },[searchInput])

    //api url changer
    useEffect(()=>{
        setApiUrl(`https://swapi.dev/api/people/?page=${page}`)
    },[page])


    //popup open
    const handleCardClick = async (person:any) => {
        setShowPopup(true)
        setPerson(person)   
        
        //fetch homeworl
        if (person?.homeworld) {
            const homeWorld = await FetchHomeWorld(person.homeworld); 
            setHomeWorld(homeWorld); 
        }
    }
    //popup close
    const handleClosePopup = () => {
        setShowPopup(false)
        setPerson(null)
        setShowMore(false) 
        setComplexDetails({
            films: [],
            species: [],
            vehicles: [],
            starships: [],
        });
    }

    //arrow next
    const nextHandler = () => {
        setPage((prev) => prev + 1)
    }
    //arrow back
    const backHandler = () => {
        setPage((prev) => prev - 1)
    }
    //paggination
    useEffect(()=>{
        const filteredStartIndex = (page - 1) * 10;
        const filteredEndIndex = page * 10;
        const paginatedFilteredCharacters = filteredCharacters?.slice(filteredStartIndex, filteredEndIndex);
        setPaginatedFilteredCharacters(paginatedFilteredCharacters)
    },[page, searchInput, filteredCharacters])


    //show more handler
    const showMoreHandler = async (filmApis: any, speciesApis: any, vehicleApis: any, starshipApis:any) => {
        setShowMore(true)
        setLoadingComplexData(true)
        try {
            const filmsResponse = await Promise.all(filmApis.map((filmApi: string) => FetchMovies(filmApi)));
            const speciesResponse = await Promise.all(speciesApis.map((speciesApi: string) => FetchSpecies(speciesApi)));
            const vehiclesResponse = await Promise.all(vehicleApis.map((vehicleApi: string) => FetchVehicles(vehicleApi)));
            const starshipsResponse = await Promise.all(starshipApis.map((starshipApi: string) => FetchStarships(starshipApi)));
    
            setComplexDetails(({
                films: [...filmsResponse],
                species: [...speciesResponse],
                vehicles: [ ...vehiclesResponse],
                starships: [...starshipsResponse],
            }));
            setLoadingComplexData(false)
        } catch (error) {
            console.error("Failed fetching Complex Details");
        }
    }
    
  return (
    <div>
        {/* characters names container*/}
       <div className="flex flex-wrap relative justify-center gap-4 mb-10 mt-10 ml-auto mr-auto  p-10 w-2/3 border border-gray-400 rounded">
            {(paginatedFilteredCharacters || peopleData?.results)?.map((person) => (
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
            {
                peopleDataLoading == false &&
                <>
                    <FaArrowLeft 
                        onClick={peopleData?.previous? backHandler : undefined} 
                        className={peopleData?.previous? 'arrows -left-5 top-1/3 cursor-pointer ' : 'arrows -left-5 top-1/3 cursor-not-allowed'}
                    />
                    <FaArrowRight 
                        onClick={(searchInput? (paginatedFilteredCharacters && paginatedFilteredCharacters?.length < 10) : peopleData?.next == null)? undefined :  nextHandler} 
                        className={(searchInput? (paginatedFilteredCharacters && paginatedFilteredCharacters?.length < 10) : peopleData?.next == null)? 'arrows -right-5 top-1/3 cursor-not-allowed ' : 'arrows -right-5 top-1/3 cursor-pointer'}
                    />
                </>
            }

            {/* show loading */}
            {
                peopleDataLoading == true &&
                <Loading/>
            }

        </div>

        {/* Detailed popup */}
        {showPopup && person && (
            <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-40 flex justify-center items-center">
                <div className="relative bg-black lg:w-1/3 md:w-1/3  text-gray-300 p-10  border-2 rounded-lg">
                    {/* loading complex data */}
                    {loadingComplexData && <Loading/>}  

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
                        <p><strong>Homeworld:</strong> {homeWorld}</p>

                        {/* Show More Section */}
                        {showMore && (
                            <>
                                <p><strong>Films:</strong> {complexDetails.films?.map((film: any, index: any) => (<span key={index}>{film}, </span>))}</p>
                                <p><strong>Species:</strong> {complexDetails.species?.map((species: any, index: any) => (<span key={index}>{species}, </span>))}</p>
                                <p><strong>Vehicles:</strong> {complexDetails.vehicles?.map((vehicle: any, index: any) => (<span key={index}>{vehicle}, </span>))}</p>
                                <p><strong>Starships:</strong> {complexDetails.starships?.map((Starship: any, index: any) => (<span key={index}>{Starship}, </span>))}</p>
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
                                onClick={() => showMoreHandler(person.films, person.species, person.vehicles, person.starships)}
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