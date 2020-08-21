import React from 'react';
import Nav from './Nav';


function Header(props){

    return (
        <header className='page-header'>
            <h1>Lambda Eats</h1>
            <Nav/>
        </header>
    )
}

export default Header;