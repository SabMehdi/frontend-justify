import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
    let { user } = useContext(AuthContext)
    return (
        <div>
            <Link to="/">Home</Link>
            <span> | </span>
            {
                user ? (
                    <span>
                        <span> Welcome, {user.username}!</span>
                        <span> | </span>
                        <span> Logout</span>
                    </span>

                ) :
                    <span>
                        <Link to="/login">Login</Link>
                        <span> | </span>
                        <Link to="/signup">Signup</Link>
                    </span>
            }
        </div>
    )
}

export default Header