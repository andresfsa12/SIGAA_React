import { useContext, useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import {  Table, IconButton, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, TextField, Button} from '@mui/material';
import { EditOutlined, DeleteForeverOutlined } from '@mui/icons-material';
import UserContext from '../../Contexto/UserContext';

//Estilos de la ventana para editar estudiante
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:   
 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const TablaEstudiante = () => {

  
const [studentList, setStudentList] = useState([]);
const cod_Acudiente = useContext(UserContext);

//Consultar estudiantes que esten relacionados con el ID del acudiente que inició sesión  
const getUser = async ()=>{
  try{
    const {data} = await axios.get('http://localhost:3000/api/acudiente-estudiante', {params: { cod_Acudiente }});
      setStudentList(data);
  } catch(error){
      console.error('Error al obtener datos:', error);
  }
}

    useEffect(() => {
      getUser();
    })
  
  return (
    <div>
      
      <div className='Body2'>
        <div className='tabla-content'>
        <div className='tabla-content'>
          <h1>Estudiantes</h1>
        </div>
      <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Codigo</TableCell>
                <TableCell>Tipo ID</TableCell>
                <TableCell>ID Estudiante</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Fecha de nacimiento</TableCell>
                <TableCell>Genero</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Clave</TableCell>
                <TableCell>Grado</TableCell>
                <TableCell>Id Acudiente</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentList.map((estudiante,index)=>(
                <TableRow key={index}>
                    <TableCell>{estudiante.Codigo}</TableCell>
                    <TableCell>{estudiante.Tipo_Id}</TableCell>
                    <TableCell>{estudiante.Id_Estudiante}</TableCell>
                    <TableCell>{estudiante.Nombre}</TableCell>
                    <TableCell>{estudiante.Apellido}</TableCell>
                    <TableCell>{estudiante.fecha_nacimiento}</TableCell>
                    <TableCell>{estudiante.Genero}</TableCell>
                    <TableCell>{estudiante.Direccion}</TableCell>
                    <TableCell>{estudiante.Clave}</TableCell>
                    <TableCell>{estudiante.Codigo_Grado}</TableCell>
                    <TableCell>{estudiante.Id_Acudiente}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </div>
    
      </div>
  )
}
export default TablaEstudiante;