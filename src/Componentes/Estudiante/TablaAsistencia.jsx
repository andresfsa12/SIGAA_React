import React from 'react'
import { useContext, useEffect, useState } from 'react'
import {  Table, IconButton, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, TextField, Button} from '@mui/material';
import axios from 'axios'
import UserContext from '../../Contexto/UserContext';

export const TablaAsistencia = () => {

    const [asistenciaList, setAsistenciaList] = useState([]);
    const cod_Estudiante = useContext(UserContext);

    const getAsistencia = async ()=>{
        try{
          const {data} =await axios.get('http://localhost:3000/api/asistencia-estudiante', {params: { cod_Estudiante }});
          setAsistenciaList(data);
        } catch(error){
          console.error('Error al obtener datos:',error);
        }
      }

      useEffect(() => {
        getAsistencia();
      })

  return (
    <div className='Body2'>
        <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Codigo</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Codigo Estudiante</TableCell>
                <TableCell>Asignatura</TableCell>
                <TableCell>Periodo Académico</TableCell>
                <TableCell>Docente</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {asistenciaList.map((asistencia,index)=>(
                <TableRow key={index}>
                    <TableCell>{asistencia.Codigo_Asistencia}</TableCell>
                    <TableCell>{asistencia.Fecha}</TableCell>
                    <TableCell>{asistencia.Codigo_Estudiante}</TableCell>
                    <TableCell>{asistencia.Materia}</TableCell>
                    <TableCell>{asistencia.Periodo_Nombre}</TableCell>
                    <TableCell>{asistencia.Nombre_Docente}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
       
            </div>
      </div>
  )
}
