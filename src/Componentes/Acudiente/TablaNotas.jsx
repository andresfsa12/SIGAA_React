import React from 'react'
import { useEffect, useState } from 'react'
import {  Table, IconButton, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, TextField, Button} from '@mui/material';
import axios from 'axios'

export const TablaNotas = () => {
    
    const [notasList, setNotasList] = useState([]);

    const getNota = async ()=>{
        try{
          const {data} =await axios.get('http://localhost:3000/api/notas');
          setNotasList(data)
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
                <TableCell>Estudiante</TableCell>
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
                    <TableCell>{notas.Codigo_Materia}</TableCell>
                    <TableCell>{notas.Codigo_Periodos}</TableCell>
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
