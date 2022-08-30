import React from 'react';


const Card = ({text, handleVote, voteValue, hideName, otherName}) => {
  return <div onClick={() => handleVote(otherName || '', voteValue)} className='col text-center m-2 fw-bold text-white card'>{!hideName && text}</div>;
}
 
export default Card;