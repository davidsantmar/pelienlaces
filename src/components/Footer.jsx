import React from 'react';

const Footer = () => {
    return (
        <footer id='footer'>
            <a  className='footer__link' href='http://dasan-dev.web.app' target='blank'>
                Developed by David Santia
                <span className='go--container'>
                    GO
                </span>!&nbsp;
                <sup>
                    &#169;
                </sup>
            </a>
            <span className='credit'>Based on TMDA data</span>
        </footer>
    );
};

export default Footer;