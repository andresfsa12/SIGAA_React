import React from 'react'
import { useContext, useEffect, useState } from 'react'
import {  Table, IconButton, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, TextField, Button} from '@mui/material';
import axios from 'axios'
import UserContext from '../../Contexto/UserContext';

export const TablaHorario = () => {

    const [horarioList, setHorarioList] = useState([]);
    const id_Docente = useContext(UserContext);

    const getHorarioD = async ()=>{
        try{
          const {data} =await axios.get('http://localhost:3000/api/horario-docente', {params: { id_Docente }});
          setHorarioList(data);
        } catch(error){
          console.error('Error al obtener datos:',error);
        }
      }

      useEffect(() => {
        getHorarioD();
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
              </TableRow>
            </TableHead>
            <TableBody>
              {horarioList.map((horariodocente,index)=>(
                <TableRow key={index}>
                    <TableCell>{horariodocente.Dia}</TableCell>
                    <TableCell>{horariodocente.Hora}</TableCell>
                    <TableCell>{horariodocente.Materia}</TableCell>
                    <TableCell>{horariodocente.Codigo_Grado_H}</TableCell>
                    <TableCell>{horariodocente.Jornada}</TableCell>
                    <TableCell>{horariodocente.Nombre_Docente}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
            </div>
      </div>
  )
}