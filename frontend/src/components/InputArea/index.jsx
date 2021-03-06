import Box from '@mui/material/Box';
import { FaBomb } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import Table from '../Table';
import Container from './style';
import http from '../../services/api';

/**
 * Sobre Componente InputArea:
 * Tem a função de além de controlar os valores nos inputs de task/employee/status
 * também enviar esses valores para o componente filho Table para o resultado seja renderizado na tela,
 * também envia 3 funções para Table (removeTaskById, updateTask, getAll )
 * A função getAll é chamada toda vez que alguma modificação é realizada nos valores e assim
 * é efetuada uma nova renderização na tela.
 */

export default function InputArea() {
  const [newtask, setNewTask] = useState('');
  const [employee, setEmployee] = useState('');
  const [status, setStatus] = useState('pendente');
  const [isInputValid, setIsInputValid] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [temporaryId, setTemporaryId] = useState('');
  const [loading, setLoading] = useState(true);

  const getAll = async (column = 'date', value = 1) => {
    const resultGetAllTasks = await http.getAllTasks({ column, value });
    setTasks(resultGetAllTasks);
    setLoading(false);
  };

  const cleanInputs = () => {
    getAll();
    setNewTask('');
    setEmployee('');
    setTemporaryId('');
  };

  useEffect(() => {
    setIsInputValid(Boolean(newtask) && Boolean(employee));
  }, [newtask, employee]);

  useEffect(() => {
    getAll();
  }, []);

  const handleButtonInsert = async (newtask, employee, status, e) => {
    if (e.target.innerText === 'Inserir') {
      await http.createNewTask({ newtask, employee, status });
      cleanInputs();
    } else {
      await http.updateTaskById({
        task: newtask,
        employee,
        status,
        _id: temporaryId,
      });
      cleanInputs();
    }
    getAll();
  };

  const removeTaskById = async (id) => {
    await http.removeTaskById({ id });
    getAll();
  };

  const updateTask = (_id, task, employee, status) => {
    setNewTask(task);
    setEmployee(employee);
    setTemporaryId(_id);
    setStatus(status);
  };

  const cancelEdition = () => cleanInputs();

  return (
    <Container>
      <fieldset>
        <legend> Gerenciamento de Tarefas</legend>
        <input
          className='input-task'
          value={newtask}
          onChange={(e) => setNewTask(e.target.value)}
          maxLength='85'
          placeholder='Digite aqui a tarefa a ser inserida'
        />
        <input
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          maxLength='25'
          placeholder='Digite o nome do empregado'
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value='pendente'>pendente</option>
          <option value='pronto'>pronto</option>
          <option value='em andamento'>em andamento</option>
        </select>
        <button
          type='button'
          onClick={(e) => handleButtonInsert(newtask, employee, status, e)}
          disabled={!isInputValid}
        >
          {temporaryId ? 'Editar' : 'Inserir'}
        </button>
        {temporaryId && (
          <Tooltip title='cancelar edição'>
            <IconButton onClick={() => cancelEdition()} className='btn__cancel'>
              <FaBomb className='icon__cancel' />
            </IconButton>
          </Tooltip>
        )}
      </fieldset>
      {loading && (
        <Box sx={{ display: 'flex' }} className='box'>
          <CircularProgress className='circular' />
        </Box>
      )}
      {!loading && (
        <Table
          tasks={tasks}
          removeTaskById={removeTaskById}
          updateTask={updateTask}
          getAll={getAll}
        />
      )}
    </Container>
  );
}
