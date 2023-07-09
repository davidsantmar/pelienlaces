import React, { useEffect, useState, Fragment } from 'react';
import { useSelector} from 'react-redux';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/index';
import { Link } from "react-router-dom";

const ShowRatings = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const userRatingsCollection = collection(db, `${user.uid}_ratings`);
    const [userRatings, setUserRatings] = useState([]);
    const [totalComments, setTotalComments] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);
    useEffect(() => {
        printData();
        document.getElementById('ratings-tab').style.backgroundColor = 'lightgrey';
        document.getElementById('ratings-tab').style.borderRadius = '10px';
        document.getElementById('footer').style.marginTop = '-1rem'
    }, [])
   
    const { isAuthenticated } = useSelector((state) => {
        return {
          isAuthenticated: state.auth.isAuthenticated
        };
    });
    const printData = () =>{
            setName(user.displayName)
            setEmail(user.email);
            setPhoto(user.photoURL);
            const emailVerified = user.emailVerified;
            const uid = user.uid;
            const commentsNumber = 0;
            getTotalDocs().then(printBadge(commentsNumber)); 
            getTotalRatings();
            showRatings();
    }
    const printBadge = (commentsNumber) => {
        if (commentsNumber >= 0 || commentsNumber < 50){
            document.getElementById('badge').innerHTML = '&#129353';
        }else if (commentsNumber >= 50 || commentsNumber < 200){
            document.getElementById('badge').innerHTML = '&#129352';
        }else if (commentsNumber >= 200){
            document.getElementById('badge').innerHTML = '&#129351';
        }
    }
    const getTotalDocs = async () => {  
        db.collection(`${user.uid}_comments`).get().then(function(querySnapshot) {
            setTotalComments(querySnapshot.size)
            return totalComments;
        });
    }
    const getTotalRatings= async () => {  
        db.collection(`${user.uid}_ratings`).get().then(function(querySnapshot) {
            setTotalRatings(querySnapshot.size)
            return totalRatings;
        });
    }
    const showRatings = () => {
        const getRatings = async () => {
            const data = await getDocs(userRatingsCollection);
            setUserRatings(data.docs.map((doc) => ({...doc.data(), id:doc.id})));   
        }
        getRatings();
    }
    
    return (
        <>
        {isAuthenticated ? (
            <>
            <div className='user--profile--section'>
                <div className='user--profile--container'>
                    <div className='user--data'>
                        <div className='user__info'>
                            <span className='user__name'>{name}</span>
                            <span className='user__email'>{email}</span>
                            <span>Comentador nivel <span id='badge'></span> </span>
                            <span>{totalComments} comentarios</span>
                            <span>{totalRatings} valoraciones</span>
                        </div>
                        <img className='user__picture' alt='user_photo' id='picture' src={photo} />
                    </div>
                    <hr />
                    <div className='tabs'>
                        <Link className='comments__info' to='/showComments'>
                            Comentarios
                        </Link>
                        <Link className='ratings__info' id='ratings-tab'>
                            Puntuaciones
                        </Link>
                    </div>
                    <div className='dashboard--info'>
                        {userRatings
                            .sort(function (a, b) {
                                return b.createdAt - a.createdAt;
                            })
                            .map((userRating) => {
                                return(
                                    <Fragment>
                                        <div className='comment__card'>
                                            <span className='comment__date'>El {new Date(userRating.createdAt.seconds * 1000).toLocaleDateString("es-ES")} </span>
                                            <span className='posting__nick'>puntuaste con </span>
                                            <span className='rating'> {userRating.rating} estrellas</span>
                                            <span className='movie__title'> la película "{userRating.movieTitle}"</span>
                                        </div>
                                    </Fragment>
                                )
                            })}
                    </div>
                </div>
            </div>
            </>
            ) : (
                <div
                type="button"
                className='user__profile' 
                >
                </div>
            )}
        </>
    );
};

export default ShowRatings;