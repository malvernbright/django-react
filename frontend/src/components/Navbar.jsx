import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from "../App"

export default function Navbar() {
    const {isAuthorized} = useContext(AppContext);
    return (
        <nav className='topnav'>
            {isAuthorized && (
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            )}
        </nav>
    )
}
