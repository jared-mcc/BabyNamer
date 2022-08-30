import Card from "./Card";
import React from 'react';


const VotingInterface = ({nameOne, nameTwo, handleVote}) => {
  return <div className="row">
      <Card handleVote={handleVote} voteValue={-2} otherName={nameTwo} text={nameOne} />
      <Card handleVote={handleVote} voteValue={-1} otherName={nameTwo} text={nameOne} hideName/>
      <Card handleVote={handleVote} voteValue={0} hideName/>
      <Card handleVote={handleVote} voteValue={-1} otherName={nameOne} text={nameTwo} hideName/>
      <Card handleVote={handleVote} voteValue={-2} otherName={nameOne} text={nameTwo}/>
    </div>;
}
 
export default VotingInterface;