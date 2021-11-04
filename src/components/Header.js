import React from 'react';
import './Header.css'
//import { useState } from 'react';

function Header(props){

    return(
        <div id='header-container'>
            <h1 id='username'>Welcome, {props.username}</h1>
            <h2>Let's Get QUIZzicle!</h2>
            <button id='logout' onClick={function(){
                window.location.reload(false);
            }}>logout</button>
        </div>
    );
}

export default Header;