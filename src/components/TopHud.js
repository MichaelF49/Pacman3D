import React, { useState } from 'react'
import globals from '../globals';

const TopHud = ({ orange, melon }) => {
  let [numOrange, setNumOrange] = useState(orange)
  let [numMelon, setNumMelon] = useState(melon)

  globals.updateAmmo = (orangeCount, melonCount) => {
    setNumOrange(orangeCount)
    setNumMelon(melonCount)
  }

  return (
    <p>Cherries: inf, Oranges: {numOrange}, Melons: {numMelon}</p>
  ) 
}

export default TopHud
