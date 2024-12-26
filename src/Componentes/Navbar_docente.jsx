import React from 'react'
import {useRef} from "react";
import {FaBars, FaTimes} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LogoSIGAA from '../INDEX/Logo SIGAA B.png'

function Navbar_docente() {
    const navRef = useRef();

    const showNavbar = () =>{
        navRef.current.classList.toggle("responsive_nav");

    }
  return (
        <header>
            <nav ref={navRef}>
            <img src={LogoSIGAA} alt="Logo" width="120px"></img>
                <ul>
                <li><Link to="/Docente/Notas">Notas</Link></li>
                <li><Link to="/Docente/Horario">Horario</Link></li>
                <li><Link to="/Docente/Asistencia">Asistencia</Link></li>
                </ul>
                <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className='nav-btn' onClick={showNavbar}>
                <FaBars/>
            </button>
        </header>
  )
}

export default Navbar_docente