import React from 'react';
import { Link } from "react-router-dom";
import Navbar from './Navbar';

const Header = () => {
    return (
        <header className='header'>
                <div className='web--name'>
                    <h1 className='title'>
                        PELI ADVISOR
                        <div className='beta__container'>
                            <sup className='beta'>BETA</sup>
                        </div>
                    </h1>
                    <Link to='/' className='logo home'></Link>
                </div>
        </header>
    );
};

export default Header;