import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Table, IconButton, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, TextField, Button, MenuItem, FormControl, Select} from '@mui/material';
import { EditOutlined, DeleteForeverOutlined, AddCircleOutline } from '@mui/icons-material';
import axios from 'axios'
import UserContext from '../../Contexto/UserContext';

//Estilos de la ventana para editar horario
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
export const TablaHorario = () => {

  const [horarioList, setHorarioList] = useState([]);
  const [editingHorario, setEditingHorario] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false); // Estado para controlar la visibilidad del modal de agregar Horario
  const [newHorario, setNewHorario] = useState({ // Estado para almacenar los datos del nuevo HORARIO
    Dia: '',
    Hora: '',
    Materia: '',
    Codigo_Grado: '',
    Jornada: '',
    Codigo_Docente: '',
    });


    const getHorario = async ()=>{ //Consultar HORARIO
        try{
          const {data} =await axios.get('http://localhost:3000/api/horario');
          setHorarioList(data);
        } catch(error){
          console.error('Error al obtener datos:',error);
        }
      }

    //ELIMINAR fila de HORARIO
    const onDelete = async (Codigo)=>{
      try{
        const {data}=await axios.post('http://localhost:3000/api/eliminar-horario',{Codigo: Codigo})
        alert(data.message)
        getHorario()
      }
      catch(error){
        console.log(error)
      }
    }

    // ACTUALIZAR fila HORARIO
    const handleOpenModal = (horario) => {
      setEditingHorario(horario);
      setOpenModal(true);
    };
    const handleCloseModal = () => {
      setEditingHorario(null);
      setOpenModal(false);
    };
    
    const handleEditChange = (event) => {
      setEditingHorario({
        ...editingHorario,
        [event.target.name]: event.target.value,
      });
    };

    const handleSaveEdit = async () => {
      try {
        await axios.put(`http://localhost:3000/api/actualizar-horario/${editingHorario.Codigo}`, editingHorario);
        getHorario();
        handleCloseModal();
        alert('Actualizado correctamente');
      } catch (error) {
        console.log(error);
        alert('Error al procesar la solicitud.');
      }
    };

    // AGREGAR fila HORARIO

      const handleOpenAddModal = () => {// Función para abrir el modal de agregar una fila al HORARIO
        setOpenAddModal(true);
        };
  
      const handleCloseAddModal = () => {// Función para cerrar el modal de agregar una fila al HORARIO
          setOpenAddModal(false);
          setNewHorario({  // Limpia el estado newHorario
            Dia: '',
            Hora: '',
            Materia: '',
            Codigo_Grado: '',
            Jornada: '',
            Codigo_Docente: ''
          });
        };
  
        const handleAddChange = (event) => {// Función para manejar los cambios en los campos del formulario de agregar fila al HORARIO
          setNewHorario({
            ...newHorario,
            [event.target.name]: event.target.value,
          });
        };
  
        // Función para guardar el nuevo estudiante
        const handleSaveAdd = async () => {
          try {
            await axios.post('http://localhost:3000/api/agregar-horario', newHorario);
            getHorario(); // Actualiza la lista después de agregar
            handleCloseAddModal();
            alert('Registro agregado correctamente');
          } catch (error) {
            console.log(error);
            alert('Error al agregar nuevo Horario.');
          }
        };
      useEffect(() => {
        getHorario();
      })

  return (
    <div className='body2'>
        <p>Horario:</p>
        <div>        
            
          <TableContainer component={Paper}>
            {/* Agrega un botón para abrir el modal de agregar nuevo registro */}
            <Button 
                variant="contained" 
                startIcon={<AddCircleOutline/>} 
                onClick={handleOpenAddModal}
                sx={{marginBottom: 2}}
            >
                Agregar Nuevo Registro
            </Button>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>Codigo</TableCell>
                <TableCell>Día</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Materia</TableCell>
                <TableCell>Grado</TableCell>
                <TableCell>Jornada</TableCell>
                <TableCell>Docente</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {horarioList.map((horario,index)=>(
                <TableRow key={index}>
                    <TableCell>{horario.Codigo}</TableCell>
                    <TableCell>{horario.Dia}</TableCell>
                    <TableCell>{horario.Hora}</TableCell>
                    <TableCell>{horario.Materia}</TableCell>
                    <TableCell>{horario.Codigo_Grado}</TableCell>
                    <TableCell>{horario.Jornada}</TableCell>
                    <TableCell>{horario.Codigo_Docente}</TableCell>
                    <TableCell>
                      <IconButton size='small' color='primary' onClick={() => handleOpenModal(horario)}>
                        <EditOutlined/>
                      </IconButton>
                      <IconButton onClick={()=>onDelete(horario.Codigo)} size='small' color='secondary'>
                        <DeleteForeverOutlined/>
                      </IconButton>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
        
        {/* Modal para agregar nuevos estudiantes */}
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
          <h2>Agregar Nuevo Registro</h2>
          <FormControl>
          <TextField 
            select label="Día" name="Dia" value={newHorario.Dia} onChange={handleAddChange} fullWidth margin="normal"  
            helperText="Selecciona el día">
              <MenuItem value="Lunes">Lunes</MenuItem>
              <MenuItem value="Martes">Martes</MenuItem>
              <MenuItem value="Miercoles">Miércoles</MenuItem>
              <MenuItem value="Jueves">Jueves</MenuItem>
              <MenuItem value="Viernes">Viernes</MenuItem>
              <MenuItem value="Sabado">Sábado</MenuItem>
          </TextField>
          
          <TextField 
            label="Hora" name="Hora" type='time' value={newHorario.Hora} onChange={handleAddChange} fullWidth margin="normal" 
          />
          <TextField 
            select label="Materia" name="Materia" value={newHorario.Materia} onChange={handleAddChange} fullWidth margin="normal" 
            helperText="Selecciona la materia">
            <MenuItem value="Algebra">Algebra</MenuItem>
            <MenuItem value="Aritmetica">Aritmetica</MenuItem>
            <MenuItem value="Artes">Artes</MenuItem>
            <MenuItem value="Ciencias Sociales">Ciencias Sociales</MenuItem>
            <MenuItem value="Deporte">Deporte</MenuItem>
            <MenuItem value="Español">Español</MenuItem>
            <MenuItem value="Filosofia">Filosofia</MenuItem>
            <MenuItem value="Fisica">Fisica</MenuItem>
            <MenuItem value="Ingles">Inglés</MenuItem>
            <MenuItem value="Matematicas">Matemáticas</MenuItem>
            <MenuItem value="Quimica">Química</MenuItem>
            <MenuItem value="Tecnologia">Tecnología</MenuItem>
            <MenuItem value="Etica">Ética</MenuItem>
            <MenuItem value="Emprendimiento">Emprendimiento</MenuItem>
            <MenuItem value="Ciencias Economicas">Ciencias Económicas</MenuItem>
            <MenuItem value="Democracia">Democracia</MenuItem>
          </TextField>
          <TextField 
            select label="Grado" name="Codigo_Grado" value={newHorario.Codigo_Grado} onChange={handleAddChange} fullWidth margin="normal" 
            helperText="Selecciona el grado">
            <MenuItem value="601">601</MenuItem>
            <MenuItem value="602">602</MenuItem>
            <MenuItem value="603">603</MenuItem>
            <MenuItem value="604">604</MenuItem>
            <MenuItem value="701">701</MenuItem>
            <MenuItem value="702">702</MenuItem>
            <MenuItem value="703">703</MenuItem>
            <MenuItem value="704">704</MenuItem>
            <MenuItem value="801">801</MenuItem>
            <MenuItem value="802">802</MenuItem>
            <MenuItem value="803">803</MenuItem>
            <MenuItem value="804">804</MenuItem>
            <MenuItem value="901">901</MenuItem>
            <MenuItem value="902">902</MenuItem>
            <MenuItem value="903">903</MenuItem>
            <MenuItem value="904">904</MenuItem>
            <MenuItem value="1001">1001</MenuItem>
            <MenuItem value="1002">1002</MenuItem>
            <MenuItem value="1003">1003</MenuItem>
            <MenuItem value="1004">1004</MenuItem>
            <MenuItem value="1101">1101</MenuItem>
            <MenuItem value="1102">1102</MenuItem>
            <MenuItem value="1103">1103</MenuItem>
            <MenuItem value="1104">1104</MenuItem>
          </TextField>
          <TextField 
            select label="Jornada" name="Jornada" value={newHorario.Jornada} onChange={handleAddChange} fullWidth margin="normal" 
          helperText="Selecciona la jornada">
            <MenuItem value="Mañana">Mañana</MenuItem>
            <MenuItem value="Tarde">Tarde</MenuItem>
            <MenuItem value="Sabados">Sábado</MenuItem>
            <MenuItem value="Nocturno">Nocturno</MenuItem>
          </TextField> 

          <TextField 
            label="Codigo Docente" name="Codigo_Docente" value={newHorario.Codigo_Docente} onChange={handleAddChange} fullWidth margin="normal" 
          />
          <Button variant="contained" onClick={handleSaveAdd}>Agregar</Button>
          </FormControl>
        </Box>
      </Modal>
      
      {/*Modal para actualizar estudiantes*/}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <h2>Editar Horario</h2>
          {editingHorario && (
            
            <form>
              <FormControl>
              <TextField select label="Dia" name="Dia" value={editingHorario.Dia} onChange={handleEditChange} fullWidth margin="normal" 
               helperText="Selecciona el día">
               <MenuItem value="Lunes">Lunes</MenuItem>

               <MenuItem value="Martes">Martes</MenuItem>
               <MenuItem value="Miercoles">Miércoles</MenuItem>
               <MenuItem value="Jueves">Jueves</MenuItem>
               <MenuItem value="Viernes">Viernes</MenuItem>
               <MenuItem value="Sabado">Sábado</MenuItem>
              </TextField>
              <TextField label="Hora" name="Hora" type='time' value={editingHorario.Hora} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField select label="Materia" name="Materia" value={editingHorario.Materia} onChange={handleEditChange} fullWidth margin="normal" 
                helperText="Selecciona la materia">
                <MenuItem value="Algebra">Algebra</MenuItem>
                <MenuItem value="Aritmetica">Aritmetica</MenuItem>
                <MenuItem value="Artes">Artes</MenuItem>
                <MenuItem value="Ciencias Sociales">Ciencias Sociales</MenuItem>
                <MenuItem value="Deporte">Deporte</MenuItem>
                <MenuItem value="Español">Español</MenuItem>
                <MenuItem value="Filosofia">Filosofia</MenuItem>
                <MenuItem value="Fisica">Fisica</MenuItem>
                <MenuItem value="Ingles">Inglés</MenuItem>
                <MenuItem value="Matematicas">Matemáticas</MenuItem>
                <MenuItem value="Quimica">Química</MenuItem>
                <MenuItem value="Tecnologia">Tecnología</MenuItem>
                <MenuItem value="Etica">Ética</MenuItem>
                <MenuItem value="Emprendimiento">Emprendimiento</MenuItem>
                <MenuItem value="Ciencias Economicas">Ciencias Económicas</MenuItem>
                <MenuItem value="Democracia">Democracia</MenuItem>
               </TextField>
              <TextField 
                select label="Grado" name="Codigo_Grado" value={editingHorario.Codigo_Grado} onChange={handleEditChange} fullWidth margin="normal" 
                helperText="Selecciona el grado">
                <MenuItem value="601">601</MenuItem>
                <MenuItem value="602">602</MenuItem>
                <MenuItem value="603">603</MenuItem>
                <MenuItem value="604">604</MenuItem>
                <MenuItem value="701">701</MenuItem>
                <MenuItem value="702">702</MenuItem>
                <MenuItem value="703">703</MenuItem>
                <MenuItem value="704">704</MenuItem>
                <MenuItem value="801">801</MenuItem>
                <MenuItem value="802">802</MenuItem>
                <MenuItem value="803">803</MenuItem>
                <MenuItem value="804">804</MenuItem>
                <MenuItem value="901">901</MenuItem>
                <MenuItem value="902">902</MenuItem>
                <MenuItem value="903">903</MenuItem>
                <MenuItem value="904">904</MenuItem>
                <MenuItem value="1001">1001</MenuItem>
                <MenuItem value="1002">1002</MenuItem>
                <MenuItem value="1003">1003</MenuItem>
                <MenuItem value="1004">1004</MenuItem>
                <MenuItem value="1101">1101</MenuItem>
                <MenuItem value="1102">1102</MenuItem>
                <MenuItem value="1103">1103</MenuItem>
                <MenuItem value="1104">1104</MenuItem>
              </TextField>
              <TextField 
                select label="Jornada" name="Jornada" value={editingHorario.Jornada} onChange={handleEditChange} fullWidth margin="normal" 
                helperText="Selecciona la jornada">
                <MenuItem value="Mañana">Mañana</MenuItem>
                <MenuItem value="Tarde">Tarde</MenuItem>
                <MenuItem value="Sabados">Sábado</MenuItem>
                <MenuItem value="Nocturno">Nocturno</MenuItem>
              </TextField> 

          <TextField 

            label="Codigo Docente" name="Codigo_Docente" value={editingHorario.Codigo_Docente} onChange={handleEditChange} fullWidth margin="normal" 
          />
              <Button variant="contained" color="primary" onClick={handleSaveEdit}>Guardar</Button>
              <Button variant="outlined" color="secondary" onClick={handleCloseModal}>Cancelar</Button>
              </FormControl>
            </form>
          )}
        </Box>
      </Modal>
      </div>
  )
}
export default TablaHorario;