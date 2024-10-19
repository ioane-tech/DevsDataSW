import React from 'react'

function BgImage() {
  return (
    <div className='image_container'>
        <img className="star_wars_image" src='/assets/images/cover.jpg' alt="cover image" width={500} height={100}/>
        <img className="stars_image" src='/assets/images/coverStars.jpg' alt="cover image" width={500} height={100}/>
    </div>
  )
}

export default BgImage