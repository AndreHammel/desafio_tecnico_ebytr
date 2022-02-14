/* eslint-disable */ 
import React from 'react';
import TableContainer from './style';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

function convertDate(date) {
  return new Date(date).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
}

export default function Table({ tasks, removeTaskById, updateTask }) {

  return (
    <TableContainer>
      <thead>
        <tr>
          <th>Data</th>
          <th>Tarefa</th>
          <th>Empregado</th>
          <th>Condição</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        { tasks.map(({ date, task, employee, status, _id}) => (
          <tr key={_id}>
            <td>{ convertDate(date) }</td>
            <td>{task}</td>
            <td>{employee}</td>
            <td className={status}>{status}</td>
            <td >
              <Tooltip title='deletar' >
                <IconButton onClick={ ()=> removeTaskById(_id)}>
                  <FaTrashAlt className='icon__trash'/>
                </IconButton>
              </Tooltip>
              <Tooltip title='editar' >
                <IconButton onClick={ ()=> updateTask(_id, task, employee, status)}>
                  <FaPencilAlt className='icon__pencil'/>
                </IconButton>
              </Tooltip>
              </td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
}
