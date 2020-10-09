import React from 'react';
import logo from '../logo.svg';
import './header.css';

const Header = () => {

    return (
        <div className="fluid-container">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Phone Book<br /><span>React + FireStore</span></h1>
                <p className="author">Ow Yeong</p>
            </header>
        </div>
    );

}

export default Header;
