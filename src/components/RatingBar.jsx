import React, { useState } from 'react';
import { useSelector } from "react-redux";

const RatingBar = () => {
    const [voteDone, setVoteDone] = useState(false);
    const { isAuthenticated } = useSelector((state) => {
        return {
          isAuthenticated: state.auth.isAuthenticated
        };
    });
    const handleVote = (id) => {
        if (isAuthenticated === true){
            if (voteDone === false){
                const vote = document.getElementById(id);
                vote.style.animation = 'pulse-animation 1s';
                setVoteDone(true);
            }else{
                alert('Sólo es posible un voto.')
            }
        }else if (isAuthenticated === false || isAuthenticated === undefined){
            alert('Es necesario iniciar sesión para poder votar.');
        }
    }
    return (
        <div className="rating--bar" data-vote="0">
            <div className="star" id='star1' onClick={()=>handleVote('star1')}>
                <span className="full" data-value="1" title={1}></span>
            </div>
            <div className="star" id='star2' onClick={()=>handleVote('star2')}>
                <span className="full" data-value="2" title={2}></span>
            </div>
            <div className="star" id='star3' onClick={()=>handleVote('star3')}>
                <span className="full" data-value="3" title={3}></span>
            </div>
            <div className="star" id='star4' onClick={()=>handleVote('star4')}>
                <span className="full" data-value="4" title={4}></span>
            </div>
            <div className="star" id='star5' onClick={()=>handleVote('star5')}>
                <span className="full" data-value="5" title={5}></span>
            </div>
            <div className="star" id='star6' onClick={()=>handleVote('star6')}>
                <span className="full" data-value="6" title={6}></span>
            </div>
            <div className="star" id='star7' onClick={()=>handleVote('star7')}>
                <span className="full" data-value="7" title={7}></span>
            </div>
            <div className="star" id='star8' onClick={()=>handleVote('star8')}>
                <span className="full" data-value="8" title={8}></span>
            </div>
            <div className="star" id='star9' onClick={()=>handleVote('star9')}>
                <span className="full" data-value="9" title={9}></span>
            </div>
            <div className="star" id='star10' onClick={()=>handleVote('star10')}>
                <span className="full" data-value="10" title={10}></span>
            </div>
        </div>
    );
};

export default RatingBar;