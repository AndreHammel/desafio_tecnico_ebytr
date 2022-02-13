/* eslint-disable */ 
import React, { useEffect, useState } from 'react';

import Container from './style';
import http from '../../services/api';
import Table from '../Table';

export default function InputArea() {
  const [newtask, setNewTask] = useState('');
  const [employee, setEmployee] = useState('');
  const [status, setStatus] = useState('pendente');
  const [isInputValid, setIsInputValid] = useState(false);
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsInputValid(Boolean(newtask) && Boolean(employee));
  }, [newtask, employee]);

  useEffect(() => {
    getAll()
  },[])

  const getAll = async () => {
    const resultGetAllTasks = await http.getAllTasks();
    setTasks(resultGetAllTasks)
    setLoading(false)
  }

  const handleButtonInsert = async (newtask, employee, status) => {
    const createTask = await http.createNewTask({newtask, employee, status})
    getAll();
  };

  const removeTaskById = async (id) => {

    await http.removeTaskById({ id })
    getAll()
  }

  return (
    <Container>
      <fieldset>
        <legend> Gerenciamento de Tarefas</legend>
        <input
          className='input-task'
          value={newtask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input value={employee} onChange={(e) => setEmployee(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value='pendente'>pendente</option>
          <option value='pronto'>pronto</option>
          <option value='andamento'>em andamento</option>
        </select>
        <button type='button' onClick={() => handleButtonInsert(newtask, employee, status)}  disabled={ !isInputValid } >
          Inserir
        </button>
      </fieldset>
      { !loading && <Table tasks={tasks} removeTaskById={removeTaskById} />}
    </Container>
  );
}
