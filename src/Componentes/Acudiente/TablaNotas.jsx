import React from 'react'
import { useContext, useEffect, useState } from 'react'
import {  Table, IconButton, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, TextField, Button} from '@mui/material';
import axios from 'axios'
import UserContext from '../../Contexto/UserContext';

export const TablaNotas = () => {
    
    const [notasList, setNotasList] = useState([]);
    const cod_Acudiente = useContext(UserContext);

    const getNota = async ()=>{
        try{
          const {data} =await axios.get('http://localhost:3000/api/notas', {params: { cod_Acudiente }});
          setNotasList(data);
        } catch(error){
          console.error('Error al obtener datos:',error);
        }
      }

      useEffect(() => {
        getNota();
      })
  return (
    <div className='body2'>
       <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Codigo Estudiante</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Asignatura</TableCell>
                <TableCell>Periodo Académico</TableCell>
                <TableCell>Nota</TableCell>
                <TableCell>Docente</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notasList.map((notas,index)=>(
                <TableRow key={index}>
                    <TableCell>{notas.Codigo_Estudiante}</TableCell>
                    <TableCell>{notas.Nombre}</TableCell>
                    <TableCell>{notas.Apellido}</TableCell>
                    <TableCell>{notas.Materia}</TableCell>
                    <TableCell>{notas.Periodo_Nombre}</TableCell>
                    <TableCell>{notas.nota}</TableCell>
                    <TableCell>{notas.Codigo_Docente}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  )
}
