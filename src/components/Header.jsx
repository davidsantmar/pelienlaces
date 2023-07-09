import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector} from 'react-redux';
import { getAuth } from 'firebase/auth';

const Header = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const { isAuthenticated } = useSelector((state) => {
        return {
          isAuthenticated: state.auth.isAuthenticated
        };
    });

    return (
        <header className='header'>
                <div className='web--name' id='web-name'>
                    <h1 className='title'>
                        PELI ADVISOR
                        <div className='beta__container'>
                            <sup className='beta'>BETA</sup>
                        </div>
                    </h1>
                    <Link to='/' id='logo' className='logo home'></Link>
                    {isAuthenticated ? (
                        <>
                            <Link 
                                type="button"
                                className='user__profile' 
                                to='/userProfile'
                                id='user-photo'
                            >
                            </Link>
                        </>
                        ) : (
                            <div
                            type="button"
                            className='user__profile' 
                            >
                        </div>
                    )}
                </div>
        </header>
    );
};

export default Header;