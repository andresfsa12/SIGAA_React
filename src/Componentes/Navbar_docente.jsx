import React from 'react'
import {useRef} from "react";
import {FaBars, FaTimes} from 'react-icons/fa';

function Navbar_docente() {
    const navRef = useRef();

    const showNavbar = () =>{
        navRef.current.classList.toggle("responsive_nav");

    }
  return (
        <header>
            <nav ref={navRef}>
                <a href="/#">Grados</a>
                <a href="/#">Asignaturas</a>
                <a href="/#">Horario</a>
                <a href="/#">Asistencia</a>
                <a href="/#">Boletines</a>
                <a href="/#">Cerrar Sesión</a>
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