import React, { useEffect, useState } from "react";
import Audios from "../audio";
import "./Game.css";

const ColorMatchMaster = () => {
  const [gridSize, setGridSize] = useState(2);
  const [level, setLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);

  const [gameOver, setGameOver] = useState(false);
  const [sequencePlaying, setSequencePlaying] = useState(false);

  const colors_config = [
    "red",
    "green",
    "blue",
    "purple",
    "yellow",
    "orange",
    "pink",
    "brown",
    "gray",
  ];
  const colors = colors_config.slice(0, gridSize * gridSize);

  useEffect(() => {
    colors.forEach((color) => {
      const audio = new Audio(Audios[color]);
      audio.load();
    });
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const seq = generateSequence(colors, level, true);
      setSequence(seq);
      setSequencePlaying(true);
      handlePlaySequence(seq, 1200);
    }
  }, [isPlaying]);

  const generateSequence = (colors, level, isNewStart) => {
    let newSequence = [];
    for (let i = isNewStart ? 1 : level; i <= level; i++) {
      newSequence.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return newSequence;
  };

  const handlePlaySequence = (arr, delay) => {
    arr.forEach((item, index) => {
      setTimeout(
        () => {
          const element = document.getElementById(item);
          element.style.opacity = ".4";
          console.log(item, 'on');
          const audio = new Audio(Audios[item]);
          audio.play();
          setTimeout(() => {
            element.style.opacity = "1";
          console.log(item, 'offf');
            if ((arr.length - 1) === index) {
              setSequencePlaying(false)
            console.log(item, 'last');
            }
          }, 250);
        },
        delay + index * 1000,
      );
    });
  };

  const handleOnModeSelect = (modeType) => {
    setGridSize(modeType === "easy" ? 2 : 3);
  };

  function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  const handleOnBoxClick = (color) => {
    const audio = new Audio(Audios[color]);
    audio.play();
  
    const newUserSequence = [...userSequence, color];
  
    if (sequence[userSequence.length] !== color) {
      handleGameOver();
      return;
    }
  
    if (arraysEqual(newUserSequence, sequence)) {
      handleNextLevel();
      return;
    }
  
    setUserSequence(newUserSequence);
  };
  
  const handleGameOver = () => {
    if (level > bestScore) {
      setBestScore(level - 1);
    }
    setGameOver(true);
    setIsPlaying(false);
    setLevel(1);
    setSequence([]);
    setUserSequence([]);
  };
  
  const handleNextLevel = () => {
    const seq = generateSequence(colors, level + 1, false);
    const newSeq = [...sequence, ...seq];
    setSequence(newSeq);
    setLevel((prevLevel) => prevLevel + 1);
    setSequencePlaying(true);
    handlePlaySequence(newSeq, 1200);
    setUserSequence([]);
  };
  
  

  const renderBox = (color, index) => {
    return (
      <div
        key={index}
        id={color}
        className="boxStyle"
        style={{ backgroundColor: color }}
        onClick={() => handleOnBoxClick(color)}
      ></div>
    );
  };



  const handleRestart = () => {
    setGameOver(false);
    setIsPlaying(false);
  };

  return (
    <div className="game">
    
      <h1 className="text-4xl font-bold">Color Match Master</h1>
      {!isPlaying && !gameOver && (
        <>
          <div className="levels">
            <span
              className={`btn ${gridSize === 2 && "btn-active"}`}
              mode="easy"
              onClick={() => handleOnModeSelect("easy")}
            >
              Easy [2 x 2]
            </span>
            <span
              className={`btn ${gridSize === 3 && "btn-active"}`}
              mode="hard"
              onClick={() => handleOnModeSelect("hard")}
            >
              Hard [3 x 3]
            </span>
          </div>
          <div
            className="start btn"
            onClick={() => {
              setIsPlaying(true);
            }}
          >
            Start
          </div>
        </>
      )}
      {isPlaying && !gameOver && (
        <>
          <div>Level {level}</div>
          <div
            className="boxesStyle"
            style={{ gridTemplateColumns: `repeat(${gridSize}, 100px)`, pointerEvents: sequencePlaying && 'none' }}
          >
            {colors.map(renderBox)}
          </div>
          <div
            className="playStart btn"
            style={{ pointerEvents: sequencePlaying && 'none' }}
            onClick={() => {
              setSequencePlaying(true);
              handlePlaySequence(sequence, 700);
            }}
          >
            Replay Sequence
          </div>
        </>
      )}
      {gameOver && (
        <div>
          <h2>Game Over!</h2>
          <p>Your best score is {bestScore}.</p>
          <button onClick={handleRestart} className="btn">
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default ColorMatchMaster;
