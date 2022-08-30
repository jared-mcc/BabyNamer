import logo from "./logo.svg";
import "./App.css";
import VotingInterface from "./components/VotingInterface";
import React, { useState, useEffect } from "react";

function App() {
  const [nameOne, setNameOne] = useState("");
  const [nameTwo, setNameTwo] = useState("");
  const [name, setName] = useState('');
  const [babyNameList, setBabyNameList] = useState({
    Nathan: 100,
    David: 100,
    Josiah: 100,
    Houston: 100,
    Abe: 100,
    Rowan: 100,
    Wren: 100,
    Crosby: 100,
    Harris: 100,
    Elliott: 100,
    Ender: 100,
    Wesley: 100,
    Cole: 100,
    Cade: 100,
    Silas: 100,
    Obed: 100,
    Isaac: 100,
    Isaiah: 100,
    Ezra: 100,
    Amos: 100,
    Oscar: 100,
    Eldon: 100,
    Avis: 100,
    Arthur: 100,
    Everett: 100,
    Lance: 100,
    Grant: 100,
    Oliver: 100,
    Edison: 100,
  });

  const [pickingList, setPickingList] = useState([]);
  const [voteNumber, setVoteNumber] = useState(0);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  useEffect(() => {
    console.log({babyNameList})
    if(voteNumber !== 0){
      localStorage.setItem(name, JSON.stringify(babyNameList))
      localStorage.setItem(`${name}NumVotes`, JSON.stringify(voteNumber))
    }
  }, [babyNameList]);

  useEffect(() => {
    const storedData = localStorage.getItem(name);
    const votes = localStorage.getItem(`${name}NumVotes`);
    console.log({storedData, votes})
    if (storedData) {
      setBabyNameList(JSON.parse(storedData));
    }
    if (votes) {
      setVoteNumber(JSON.parse(votes));
    }
  }, [name]);

  const handleNameInput = (e) => {
    setName(e.target.value);
  }

  const populatePickingList = () => {
    let arr = shuffle(Object.keys(babyNameList));
    setNameOne(arr.pop());
    setNameTwo(arr.pop());
    setPickingList(arr);
  };

  const populateNames = () => {
    const arr = [...pickingList];
    setNameOne(arr.pop());
    setNameTwo(arr.pop());
    setPickingList(arr);
    if(arr.length < 2) {
      populatePickingList();
    }
  };

  useEffect(() => {
    populatePickingList();
  }, []);

  const handleVote = (babyName, difference) => {
    const VOTE_VALUE = 5;

    setVoteNumber(voteNumber + 1);
    if (babyName !== "") {
      setBabyNameList(
        Object.assign(babyNameList, {
          [babyName]: babyNameList[babyName] + difference * VOTE_VALUE,
        })
      );
    }
    if(voteNumber !== 0){
      localStorage.setItem(name, JSON.stringify(babyNameList))
      localStorage.setItem(`${name}NumVotes`, JSON.stringify(voteNumber))
    }
    populateNames();
  };

  return (
    <>
      <div className="App position-relative d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <input type="text" onInput={handleNameInput} />
        <div className="container ">
          {voteNumber}
          <VotingInterface
            handleVote={handleVote}
            nameOne={nameOne}
            nameTwo={nameTwo}
          />
        </div>
      </div>
      <div className="chart position-relative">

        {Object.keys(babyNameList).map((babyName, i) => {
          return (
            <div
              className="chartItem"
              key={Math.random(0,999999)}
              style={{
                bottom: `${babyNameList[babyName]}%`,
                left: `${(i / Object.keys(babyNameList).length) * 100}%`,
              }}
            >
              {babyName}{babyNameList[babyName]}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
