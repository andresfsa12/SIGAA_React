
import React, { useState } from 'react';
import axios from 'axios';
import { useContext} from 'react'
import UserContext from '../../Contexto/UserContext';


export function Registro_estudiante() {

    const cod_Acudiente = useContext(UserContext);

    const [values, setValues] = useState({

      Tipo_Id:'',
      Id_Estudiante:'',
      Nombre:'',
      Apellido:'',
      fecha_nacimiento:'',
      Genero:'',
      Direccion:'',
      Clave:'',
      Codigo_Grado:'',
      Codigo_Acudiente: cod_Acudiente
    })

    const handleChange = (event) =>{
        setValues({...values,[event.target.name]:[event.target.value]})
    }


    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post('http://localhost:3000/registrar-estudiante',values)
        .then(res => console.log("Registro Exitoso"),alert("Registro Exitoso"))
        .catch(err => console.log(err)); 
    }
 
  return (
    <div className='Body2'>
    <h1>Registrar estudiante:</h1>
    <div className='Content'>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='Tipo_Id'>Tipo de documento</label><br/>
                <select name='Tipo_Id' type='text' onChange={handleChange} >
                    <option value="">--Selecciona una opción--</option>
                    <option value="Ti">Tarjeta de identidad</option>
                    <option value="Cc">Cedula de ciudadania</option>
                    <option value="Ps">Pasaporte</option>
                    <option value="Ce">Cedula extranjera</option>
                </select>
            </div>
            <div>
                <label htmlFor='Id_Estudiante'>Número de documento:</label>
                <input placeholder='Ingrese numero ID ' type='number' name='Id_Estudiante' onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='Nombre'>Nombres:</label>
                <input placeholder='Ingrese su nombre' type='text' name='Nombre' onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='Apellido'>Apellidos:</label>
                <input placeholder='Ingrese su apellido' type='text' name='Apellido' onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor='fecha_nacimiento'>Fecha de nacimiento:</label>
                <input type='date' name='fecha_nacimiento' onChange={handleChange} />
            </div>
            <div>
            <label htmlFor='Genero'>Género:</label><br/>
                <select name='Genero' type='text' onChange={handleChange} >
                    <option value="">--Selecciona una opción--</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                </select>
            </div>
            <div>
                <label htmlFor='Direccion'>Dirección:</label>
                <input placeholder='Ingrese su dirección' type='text' name='Direccion' onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='Codigo_Grado'>Grado:</label><br/>
                <select name='Codigo_Grado' type="number" onChange={handleChange} >
                    <option value="">--Selecciona una opción--</option>
                    <option value="1">601</option>
                    <option value="5">701</option>
                    <option value="9">801</option>
                    <option value="13">901</option>
                    <option value="17">1001</option>
                    <option value="21">1101</option>
                </select>
            </div>
            <div>
                <label htmlFor='Clave'>Clave:</label>
                <input type='password' placeholder='Ingrese su clave' name='Clave' onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='Codigo_Acudiente'>Codigo Acudiente</label>
                <input placeholder='Ingrese cod acudiente' type='text' disabled name='Codigo_Acudiente' value={cod_Acudiente}/>
            </div>
            <div className='textbox'>
                <button className='btn' type='submit' value='registrar'>Registrar</button>
            </div>
        </form>
    </div>
    </div>
      )
}
export default Registro_estudiante