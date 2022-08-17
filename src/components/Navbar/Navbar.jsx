import React from 'react';
import {Link} from "react-router-dom";


export default function Navbar(props) {



  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container">
          <Link className="navbar-brand link fs-3" to="home">Movies</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {props.userData? <>
                <li className="nav-item">
                  <Link className="nav-link link" to="home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link" to="movies">Movies</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link" to="tvShow">Tv-Shows</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link" to="people">People</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link" to="about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link" to="findmovie">Find Movies</Link>
                </li>
              </> : ""}
            </ul>
            <div className="social center text-white">
              <span className="facebook mx-2"><i className="fa-brands fa-facebook"></i></span>
              <span className="spotfiy mx-2"><i className="fa-brands fa-spotify"></i></span>
              <span className="instagram mx-2"><i className="fa-brands fa-instagram"></i></span>
              <span className="youtube mx-2"><i className="fa-brands fa-youtube"></i></span>
            </div>
            <div className="opt center">
            {props.userData? <span onClick={props.logOut} className="nav-link link">Logout</span> : <>
              <Link className='nav-link link' to="login">Login</Link>
              <Link className='nav-link link' to="register">Register</Link>
            </>}            
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
