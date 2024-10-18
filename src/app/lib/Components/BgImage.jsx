import React from 'react'
import Image from "next/image";

function BgImage() {
  return (
    <div className='image_container'>
        <Image className="star_wars_image" src='/assets/images/cover.jpg' alt="cover image" width={500} height={100}/>
        <Image className="stars_image" src='/assets/images/coverStars.jpg' alt="cover image" width={500} height={100}/>
    </div>
  )
}

export default BgImage