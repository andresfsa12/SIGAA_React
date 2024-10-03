import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Table, IconButton, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { EditOutlined, DeleteForeverOutlined } from '@mui/icons-material';


export function TablaEstudiante () {

    const [userList,setUserList] = useState([]);

    const getUser = async () =>{
      try{
      const {data} = await axios.get('http://localhost:3000/api/acudiente-estudiantes');
          setUserList(data)
    } catch (error){
      console.error('Error al obtener datos:',error);
    }}
    
    useEffect(() => {
      getUser();
    })

     

  return (
    <div className='Body2'>
      
        <TableContainer>
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
              <TableCell>Codigo Grado</TableCell>
              <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((estudiante,index)=>(
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
                    <TableCell>
                      <IconButton size='small' color='primary'>
                        <EditOutlined/>
                      </IconButton>
                      <IconButton size='small' color='secondary'>
                        <DeleteForeverOutlined/>
                      </IconButton>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  )
}
export default TablaEstudiante