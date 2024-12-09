import React from 'react'
import { useContext, useEffect, useState } from 'react'
import {  Table, IconButton, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, TextField, Button} from '@mui/material';
import { EditOutlined, DeleteForeverOutlined, AddCircleOutline } from '@mui/icons-material'; 
import axios from 'axios';
import UserContext from '../../Contexto/UserContext';

export const TablaNotasDocente = () => {

  //Estilo de la ventana editar notas
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

  const [editingNotas, setEditingNotas] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [notasList, setNotasList] = useState([]);
  const id_docente = useContext(UserContext);
  const [openAddModal, setOpenAddModal] = useState(false); // Estado para controlar la visibilidad del modal de agregar notas
  const [newNota, setNewNota] = useState({// Estado para almacenar los datos de la nueva nota
    Codigo_Estudiante: '',
    Materia: '',
    Codigo_Periodos: '',
    nota: '',
    Codigo_Docente: id_docente // Asigna el ID del docente automáticamente
  });

  //Consultar notas segun el id del docente
    const getNota = async ()=>{
        try{
          const {data} =await axios.get('http://localhost:3000/api/notas-docente', {params: { id_docente }});
          setNotasList(data);
        } catch(error){
          console.error('Error al obtener datos:',error);
        }
      }

    // Eliminar nota

      const onDelete = async (Codigo_Notas)=>{
        try{
          const {data}=await axios.post('http://localhost:3000/api/eliminar-nota',{Codigo_Notas: Codigo_Notas})
          alert(data.message)
          getNota()
        }
        catch(error){
          console.log(error)
        }
      }
    // Editar nota
       const handleOpenModal = (notas) => {
        setEditingNotas(notas);
        setOpenModal(true);
      };
      const handleCloseModal = () => {
        setEditingNotas(null);
        setOpenModal(false);
      };
      
      const handleEditChange = (event) => {
        setEditingNotas({
          ...editingNotas,
          [event.target.name]: event.target.value,
        });
      };
  
      const handleSaveEdit = async () => {
        try {
          await axios.put(`http://localhost:3000/api/actualizar-notas/${editingNotas.Codigo_Notas}`, editingNotas);
          getNota();
          handleCloseModal();
          alert('Actualizado correctamente');
        } catch (error) {
          console.log(error);
          alert('Error al procesar la solicitud.');
        }
      };



      /// AGREGAR NOTA

      // Función para abrir el modal de agregar nota
     const handleOpenAddModal = () => {
      setOpenAddModal(true);
      };

      // Función para cerrar el modal de agregar nota
      const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setNewNota({  // Limpia el estado newNota
          Codigo_Estudiante: '',
          Materia: '',
          Grado: '',
          Codigo_Periodos: '',
          nota: '',
          Codigo_Docente: id_docente, 
        });
      };

      // Función para manejar los cambios en los campos del formulario de agregar nota
      const handleAddChange = (event) => {
        setNewNota({
          ...newNota,
          [event.target.name]: event.target.value,
        });
      };

      // Función para guardar la nueva nota
      const handleSaveAdd = async () => {
        try {
          await axios.post('http://localhost:3000/api/agregar-notas', newNota);
          getNota(); // Actualiza la lista después de agregar
          handleCloseAddModal();
          alert('Nota agregada correctamente');
        } catch (error) {
          console.log(error);
          alert('Error al agregar la nota.');
        }
      };

      useEffect(() => {
        getNota();
      })

  return (
    <div className='body2'>
      
       <TableContainer component={Paper}>
        {/* Agrega un botón para abrir el modal de agregar nota */}
        <Button 
          variant="contained" 
          startIcon={<AddCircleOutline />} 
          onClick={handleOpenAddModal}
          sx={{marginBottom: 2}}
        >
          Agregar Nota
        </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>N°</TableCell>
                <TableCell>Codigo Estudiante</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Asignatura</TableCell>
                <TableCell>Grado</TableCell>
                <TableCell>Periodo Académico</TableCell>
                <TableCell>Nota</TableCell>
                <TableCell>Docente</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notasList.map((notas,index)=>(
                <TableRow key={index}>
                    <TableCell>{notas.Codigo_Notas}</TableCell>
                    <TableCell>{notas.Codigo_Estudiante}</TableCell>
                    <TableCell>{notas.Nombre}</TableCell>
                    <TableCell>{notas.Apellido}</TableCell>
                    <TableCell>{notas.Materia}</TableCell>
                    <TableCell>{notas.Grado}</TableCell>
                    <TableCell>{notas.Codigo_Periodos}</TableCell>
                    <TableCell>{notas.nota}</TableCell>
                    <TableCell>{notas.Codigo_Docente}</TableCell>
                    
                    <TableCell>
                      
                      <IconButton size='small' color='primary' onClick={() => handleOpenModal(notas)}>
                        <EditOutlined/>
                      </IconButton>
                      <IconButton onClick={()=>onDelete(notas.Codigo_Notas)} size='small' color='secondary'>
                        <DeleteForeverOutlined/>
                      </IconButton>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      
      {/*Modal para actualizar notas*/}
      <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={style}>
        <h2>Editar Notas</h2>
        {editingNotas && (
          <form>
            <TextField label="Materia" name="Materia" value={editingNotas.Materia} onChange={handleEditChange} fullWidth margin="normal" />
            <TextField label="Notas" name="nota" value={editingNotas.nota} onChange={handleEditChange} fullWidth margin="normal" />
            <Button variant="contained" color="primary" onClick={handleSaveEdit}>Guardar</Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal}>Cancelar</Button>
          </form>
        )}
      </Box>
    </Modal>
    {/* Modal para agregar nuevas notas */}
    <Modal open={openAddModal} onClose={handleCloseAddModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow:   24,
            p: 6,
          }}
        >
          <h2>Agregar Nueva Nota</h2>
          <TextField 
            label="Codigo Estudiante" name="Codigo_Estudiante" value={newNota.Codigo_Estudiante} onChange={handleAddChange} fullWidth margin="normal" 
          />
          <TextField 
            label="Materia" name="Materia" value={newNota.Materia} onChange={handleAddChange} fullWidth margin="normal" 
          />
          <TextField 
            label="Grado" name="Grado" value={newNota.Grado} onChange={handleAddChange} fullWidth margin="normal" 
          />
          <TextField 
            label="Periodo" name="Codigo_Periodos" value={newNota.Codigo_Periodos} onChange={handleAddChange} fullWidth margin="normal" 
          />
          <TextField 
            label="Nota" name="nota" value={newNota.nota} onChange={handleAddChange} fullWidth margin="normal"
          />
          <TextField 
            label="Codigo Docente" name="Codigo_Docente" value={newNota.Codigo_Docente} onChange={handleAddChange} fullWidth margin="normal" disabled
          />
          <Button variant="contained" onClick={handleSaveAdd}>Agregar Nota</Button>
        </Box>
      </Modal>
    
  </div>
)
  
}
