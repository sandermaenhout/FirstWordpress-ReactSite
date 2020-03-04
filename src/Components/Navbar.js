import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class Navbar extends Component {

    handleLogOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    render() {
        const username = localStorage.getItem('userName');
        const token = localStorage.getItem('token');
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark navigation">
                <a className="navbar-brand" href="/">Blog Stage</a>
                <div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={`/`}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={`/blogs`}>Blog</NavLink>
                        </li>
                        {token ? (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={`/dashboard/${username}`}>Dashboard</NavLink>
                                </li>
                                <li className="nav-item">
                                    <button onClick={this.handleLogOut} className="btn btn-secondary ml-3">logout</button>
                                </li>
                            </>
                        ) : (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={`/login`}>Login</NavLink>
                                </li>
                            )}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar
