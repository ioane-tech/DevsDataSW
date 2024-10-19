import Image from 'next/image'
import React from 'react'

function Loading() {
  return (
    <div className='absolute left-0 top-0 flex items-center justify-center w-full h-full bg-black bg-opacity-70 text-white'>
        <div className='w-fit flex gap-4 items-center'>
            <Image className='loading_icon' src='/assets/icons/loading.png' alt='loading_icon' width={50} height={50}/>
            <p className='text-red-400'>Loading...</p>
        </div>
    </div>
  )
}

export default Loading