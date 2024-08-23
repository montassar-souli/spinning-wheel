import React from 'react'
import Stars from '../../assets/star.jpg'

const Test = () => {
  console.log(Stars);
  return (
    <div className="w-screen h-screen" style={{ backgroundImage: `url(${Stars})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>    
      ok
    </div>
  )
}

export default Test