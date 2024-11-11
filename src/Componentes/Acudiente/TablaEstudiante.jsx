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
  const [editingStudent, setEditingStudent] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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

    const onDelete = async (Id_Estudiante)=>{
      try{
        const {data}=await axios.post('http://localhost:3000/api/eliminar-estudiante',{Id_Estudiante: Id_Estudiante})
        alert(data.message)
        getUser()
      }
      catch(error){
        console.log(error)
      }
    }

     const handleOpenModal = (estudiante) => {
      setEditingStudent(estudiante);
      setOpenModal(true);
    };
    const handleCloseModal = () => {
      setEditingStudent(null);
      setOpenModal(false);
    };
    
    const handleEditChange = (event) => {
      setEditingStudent({
        ...editingStudent,
        [event.target.name]: event.target.value,
      });
    };

    const handleSaveEdit = async () => {
      try {
        await axios.put(`http://localhost:3000/api/actualizar-estudiante/${editingStudent.Codigo}`, editingStudent);
        getUser();
        handleCloseModal();
        alert('Actualizado correctamente');
      } catch (error) {
        console.log(error);
        alert('Error al procesar la solicitud.');
      }
    };

    useEffect(() => {
      getUser();
    })
  
  return (
    <div>
      
      <div className='Body2'>
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
                    <TableCell>{estudiante.Id_Acudiente}</TableCell>
                    <TableCell>
                      
                      <IconButton size='small' color='primary' onClick={() => handleOpenModal(estudiante)}>
                        <EditOutlined/>
                      </IconButton>
                      <IconButton onClick={()=>onDelete(estudiante.Id_Estudiante)} size='small' color='secondary'>
                        <DeleteForeverOutlined/>
                      </IconButton>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <h2>Editar Estudiante</h2>
          {editingStudent && (
            <form>
              <TextField label="Tipo ID" name="Tipo_Id" value={editingStudent.Tipo_Id} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="ID Estudiante" name="Id_Estudiante" value={editingStudent.Id_Estudiante} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Nombre" name="Nombre" value={editingStudent.Nombre} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Apellido" name="Apellido" value={editingStudent.Apellido} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Fecha de Nacimiento" name="fecha_nacimiento" value={editingStudent.fecha_nacimiento} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Género" name="Genero" value={editingStudent.Genero} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Dirección" name="Direccion" value={editingStudent.Direccion} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Clave" name="Clave" value={editingStudent.Clave} onChange={handleEditChange} fullWidth margin="normal" />
              <Button variant="contained" color="primary" onClick={handleSaveEdit}>Guardar</Button>
              <Button variant="outlined" color="secondary" onClick={handleCloseModal}>Cancelar</Button>
            </form>
          )}
        </Box>
      </Modal>
      </div>
  )
}
export default TablaEstudiante;