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
    <div className='body2'>
        <p>Horario:</p>
        <div>        
            
            <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Día</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Materia</TableCell>
                <TableCell>Grado</TableCell>
                <TableCell>Docente</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {horarioList.map((horarioestudiante,index)=>(
                <TableRow key={index}>
                    <TableCell>{horarioestudiante.Dia}</TableCell>
                    <TableCell>{horarioestudiante.Hora}</TableCell>
                    <TableCell>{horarioestudiante.Materia}</TableCell>
                    <TableCell>{horarioestudiante.Grado}</TableCell>
                    <TableCell>{horarioestudiante.Nombre_Docente}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
            </div>
      </div>
  )
}
