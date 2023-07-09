import React, { useEffect, useState, Fragment } from 'react';
import { useSelector} from 'react-redux';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/index';
import { Link } from "react-router-dom";

const ShowComments = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const userCommentsCollection = collection(db, `${user.uid}_comments`);
    const [userComments, setUserComments] = useState([]);
    const [totalComments, setTotalComments] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);

    useEffect(() => {
        printData();
        document.getElementById('comments-tab').style.backgroundColor = 'lightgrey';
        document.getElementById('comments-tab').style.borderRadius = '10px';
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
            showComments();
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
    const showComments = () => {
        const getComments = async () => {
            const data = await getDocs(userCommentsCollection);
            setUserComments(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
        }
        getComments();
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
                        <Link className='comments__info' id='comments-tab'>
                            Comentarios
                        </Link>
                        <Link className='ratings__info' to='/showRatings'>
                            Puntuaciones
                        </Link>
                    </div>
                    <div className='dashboard--info'>
                        {userComments
                            .sort(function (a, b) {
                                return b.createdAt - a.createdAt;
                            })
                            .map((userComment) => {
                                return(
                                    <Fragment>
                                        <div className='comment__card'>
                                            <span className='comment__date'>El {new Date(userComment.createdAt.seconds * 1000).toLocaleDateString("es-ES")} </span>
                                            <span className='posting__nick'>posteaste con el nick {userComment.nick}</span>
                                            <span className='comment'> "{userComment.comment}"</span>
                                            <span className='movie__title'>en la película {userComment.movieTitle}</span>
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

export default ShowComments;