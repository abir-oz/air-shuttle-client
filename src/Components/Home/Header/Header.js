import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {

    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    return (


        <header>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <Link className="ms-5 navbar-brand" to="/">Air Shuttle</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto p-2">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" href="#packages">Packages</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Contact Us</Link>
                            </li>
                            {
                                user?.email ?
                                    <li className="nav-item">
                                        <Link className="active nav-link ms-5 ps-5" to="/addPack">Dashboard</Link>
                                    </li>
                                    :

                                    <li className="nav-item">
                                        <Link className="btn btn-danger text-white nav-link ms-5 ps-5" to="/login">Login</Link>
                                    </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;