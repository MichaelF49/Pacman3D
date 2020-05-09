import React, { useState } from 'react'
import globals from '../globals'

const RightHud = ({ score, wave, enemies }) => {
  let [scoreState, setScore] = useState(score)
  let [waveState, setWave] = useState(wave)
  let [enemiesState, setEnemies] = useState(enemies)

  globals.updateGameProps = (score, wave, enemies) => {
    setScore(score)
    setWave(wave)
    setEnemies(enemies)
  }

  return (
    <p className='right-hud'>Score: {scoreState}, Wave: {waveState}, Enemies: {enemiesState}</p>
  )
}

export default RightHud
