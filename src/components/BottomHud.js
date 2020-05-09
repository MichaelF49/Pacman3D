import React, { useState } from 'react'
import globals from '../globals'
import image from '../images/heart.png'

const BottomHud = ({ hearts }) => {
  let [numHearts, setNumHearts] = useState(hearts)

  globals.updateHearts = (hearts) => {
    setNumHearts(hearts)
  }

  let heartElem = [];
  for (let i = 0; i < numHearts; i++) {
    heartElem.push(<img key={i} className='heart-img' src={image} />)
  }

  return (
    <p className='bottom-hud'>{heartElem}</p>
  ) 
}

export default BottomHud
