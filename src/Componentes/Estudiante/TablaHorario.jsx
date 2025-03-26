import React from 'react'
import { useContext, useEffect, useState } from 'react'
import {  Table, IconButton, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, TextField, Button} from '@mui/material';
import axios from 'axios'
import UserContext from '../../Contexto/UserContext';

export const TablaHorario = () => {

    const [horarioList, setHorarioList] = useState([]);
    const cod_Estudiante = useContext(UserContext);

    const getHorarioE = async ()=>{
        try{
          const {data} =await axios.get('http://localhost:3000/api/horario-estudiante', {params: { cod_Estudiante }});
          setHorarioList(data);
        } catch(error){
          console.error('Error al obtener datos:',error);
        }
      }

      useEffect(() => {
        getHorarioE();
      })

  return (
    <div className='Body2'>
        <div className='tabla-content'>
        
            <div className='tabla-content'>
              <h1>Horario</h1>
            </div>
            <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Día</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Materia</TableCell>
                <TableCell>Grado</TableCell>
                <TableCell>Jornada</TableCell>
                <TableCell>Docente</TableCell>
                <TableCell>Año</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {horarioList.map((horario,index)=>(
                <TableRow key={index}>
                    <TableCell>{horario.Dia}</TableCell>
                    <TableCell>{horario.Hora}</TableCell>
                    <TableCell>{horario.Materia}</TableCell>
                    <TableCell>{horario.Codigo_Grado_H}</TableCell>
                    <TableCell>{horario.Jornada}</TableCell>
                    <TableCell>{horario.Nombre_Docente}</TableCell>
                    <TableCell>{horario.Year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
            </div>
      </div>
  )
}
