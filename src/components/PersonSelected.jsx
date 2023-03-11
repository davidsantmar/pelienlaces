import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadPerson } from '../redux/actions/personActionCreator';

const PersonSelected = () => {
    const person = useSelector((state) => state.person);
    const dispatch = useDispatch();
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [deathDay, setDeathDay] = useState('');
    const [deathMonth, setDeathMonth] = useState('');
    const [deathYear, setDeathYear] = useState('');
    useEffect(() => {
        dispatch(loadPerson(person));
        window.scrollTo(0,0);
    }, )
    /*if (!birthDay) {
         <>Loading article...</>
    }*/
    const handleBirthday = () => {
            setBirthDay(person?.birthday?.substr(person.birthday.length-2,2) + '-');
            setBirthMonth(person?.birthday?.substr(person.birthday.length-5,2) + '-');
            setBirthYear(person?.birthday?.substr(person.birthday.length-person.birthday.length,4));
        
    }
    const handleDeathday = () => {
        if (person.deathday === null){
            return;
        }else{
            setDeathDay(person?.deathday?.substr(person.deathday.length-2,2) + '-');
            setDeathMonth(person?.deathday?.substr(person.deathday.length-5,2) + '-');
            setDeathYear(person?.deathday?.substr(person.deathday.length-person.deathday.length,4));
        }
    }
    const pushFooter = () =>{
        if (person.biography === ''){
            document.getElementById('footer').style.marginTop = '8rem';
        }
    }
    setTimeout(handleBirthday, 200);
    setTimeout(handleDeathday, 200);
    setTimeout(pushFooter, 200);
    return (
        <div className='person--section diamond'>
            <div className='person--data--container'>
                <h1 className='person__name'>{person.name}</h1>
                <img className='person__picture' src={`https://image.tmdb.org/t/p/w400${person.profile_path}`} title={person.name}></img>
                <span className='birth__place'>{person.place_of_birth}</span>                
                {person.birthday ? (
                    <span className='birthday'>{birthDay}{birthMonth}{birthYear}</span>
                ) : (
                    <span className='birth_place'>Sin datos registrados</span>
                    )
                }
                {person.deathday ? (
                    <span className='deathday'>{deathDay}{deathMonth}{deathYear}</span>                
                ) : (
                    <span className='deathday'></span>
                    )
                }
                <hr />
                {!person.biography ? (
                    <span className='biography' id='bio'>Sin datos registrados</span>    
                ) : (
                    <span className='biography'>{person.biography}</span>
                    )
                }
            </div>
            
        </div>
    );
};

export default PersonSelected;