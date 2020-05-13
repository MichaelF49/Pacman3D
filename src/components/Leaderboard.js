/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useState, useRef } from 'react';
import { globals } from '../global';
import { handleResetGlobals } from '../handlers';

const Leaderboard = ({ setShowingMenu, setShowingLeaderboard }) => {
  const [data, setData] = useState([]);
  const [showingName, setShowingName] = useState(true);
  const [name, setName] = useState('');

  const inputRef = useRef(null);

  const handleKeyPress = () => {
    inputRef.current.focus();
  };

  const handleInput = (event) => {
    if (event.target.value.length <= 3) {
      setName(event.target.value.toUpperCase());
    }
  };

  const handleLeaderboard = () => {
    setShowingName(false);

    // Add entry to leaderboard
    globals.db
      .add({
        name,
        score: globals.score,
        wave: globals.currentWave,
      })
      .then((docRef) => {
        console.log('Doc written with ID: ', docRef.id);
      })
      .catch((err) => {
        console.error('Error adding document: ', err);
      });
  };

  if (showingName) {
    return (
      <div
        className='menu leaderboard'
        tabIndex='0'
        onKeyPress={handleKeyPress}
      >
        <h1>Enter Name</h1>
        <h2>{name}</h2>
        <input
          className='name-input'
          ref={inputRef}
          spellCheck='false'
          type='text'
          value={name}
          onChange={handleInput}
          autoFocus
        />
        <button className='button' onClick={handleLeaderboard} type='button'>
          NEXT
        </button>
        <div className='invisible-name-helper' />
      </div>
    );
  }

  // Get top 5 scores
  const res = [];
  globals.db
    .orderBy('score', 'desc')
    .limit(5)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        res.push(doc.data());
      });

      for (let i = 0; i < 5; i += 1) {
        if (res.length === i)
          res.push({
            name: '___',
            score: 0,
            wave: 0,
          });
        const resOutput = `${res[i].name} ~ ${res[i].score} ~ ${res[i].wave}`;
        res[i] = <h2 key={i}>{resOutput}</h2>;
      }
      const first = 'NAME ~ SCORE ~ WAVE';
      res.unshift(<h2 key={-1}>{first}</h2>);

      setData(res);
    });

  return (
    <div className='menu scores'>
      <h1>Leaderboard</h1>
      {data}
      <button
        className='button'
        onClick={() => {
          handleResetGlobals();
          setShowingMenu(true);
          setShowingLeaderboard(false);
        }}
        type='button'
      >
        MENU
      </button>
    </div>
  );
};

export default Leaderboard;
