import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import { Table, IconButton, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { EditOutlined, DeleteForeverOutlined } from '@mui/icons-material';
/*import UserContext from '../../Contexto/UserContext';*/


export const TablaEstudiante = () => {
  
  const [studentList, setStudentList] = useState([]);

  /*const id_Acudiente = useContext(UserContext);*/

   
    /*const [codigoAcudiente,setCodigoAcudiente] = useState([]);*/

  /////////////////////////////////////////////////////////  
  //Dos formas para obtener el codigo acudiente segun su N_id:

   /* const getCode = async () =>{
      try{
      const {data1} = await axios.get('http://localhost:3000/codigo-acudientes?N_id='+infoUser);
      setCodigoAcudiente(data1)
    } catch (error){
      console.error('Error al obtener datos:',error);
    }}*/
    
    /*async function getCode() {
      const data1 = await fetch('http://localhost:3000/codigo-acudientes?N_id='+id_Acudiente+"'");
          if (data1.ok){
            alert(data1);
            setCodigoAcudiente(data1);
            }else{
              alert('Usuario o clave incorrecto');
            }}*/
////////////////////////////////////////////////////////////////////

    const getUser = async ()=>{
      try{
        const {data} =await axios.get('http://localhost:3000/api/acudiente-estudiantes');
        setStudentList(data)
      } catch(error){
        console.error('Error al obtener datos:',error);
      }
    }

    useEffect(() => {
      getUser();
    })
  
  return (
    <div>
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
              <TableCell>Codigo Acudiente</TableCell>
              <TableCell>Acciones</TableCell>
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
                    <TableCell>{estudiante.Codigo_Acudiente}</TableCell>
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
      </div>
  )
}
export default TablaEstudiante;