import React from 'react'
import {useRef} from "react";
import {FaBars, FaTimes} from 'react-icons/fa';
import { Link } from 'react-router-dom';


function Navbar_acudiente() {
    const navRef = useRef();

    const showNavbar = () =>{
        navRef.current.classList.toggle("responsive_nav");

    }
  return (
        <header>
            <nav ref={navRef}>
                <ul>
                <li><Link to="/Acudiente/Estudiantes">Estudiante</Link></li>
                <li><Link to="/Acudiente/Notas">Notas</Link></li>
                <li><Link to="/Acudiente/Registro_estudiante">Registrar</Link></li>
                <li><Link to="/">Cerrar Sesion</Link></li>
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