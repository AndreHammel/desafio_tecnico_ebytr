/* eslint-disable */ 
import React from 'react';
import TableContainer from './style';
import { FaBeer } from 'react-icons/fa';

function convertDate(date) {
  return new Date(date).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
}

export default function Table({ tasks, removeTaskById }) {

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
            <td>{status}</td>
            <td ><button type='button' onClick={ ()=> removeTaskById(_id)}>A</button></td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
}
