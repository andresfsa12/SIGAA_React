import React from 'react'
import {useRef} from "react";
import {FaBars, FaTimes} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./Navbar.css"


function Navbar_acudiente() {
    const navRef = useRef();

    const showNavbar = () =>{
        navRef.current.classList.toggle("responsive_nav");

    }
  return (
        <header>
            <nav ref={navRef}>
                <ul>
                <li><Link to="/Estudiantes">Estudiante</Link></li>
                <li><Link to="/Notas">Notas</Link></li>
                <li><Link to="/Asignaturas">Asignaturas</Link></li>
                <li><Link to="/Registro_estudiante">Registrar</Link></li>

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

export default Navbar_acudiente