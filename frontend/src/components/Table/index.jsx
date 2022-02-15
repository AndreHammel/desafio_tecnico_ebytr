import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTrashAlt, FaPencilAlt, FaArrowAltCircleDown } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TableContainer from './style';

function convertDate(date) {
  return new Date(date).toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });
}

export default function Table({ tasks, removeTaskById, updateTask, getAll }) {
  const [toggle, setToggle] = useState(false);
  return (
    <TableContainer>
      <thead>
        <tr>
          <th>
            Data
            <Tooltip title='ordenar'>
              <IconButton
                onClick={() => {
                  getAll('data', toggle ? 1 : -1);
                  setToggle(!toggle);
                }}
              >
                <FaArrowAltCircleDown />
              </IconButton>
            </Tooltip>
          </th>
          <th>
            Tarefa
            <Tooltip title='ordenar'>
              <IconButton
                onClick={() => {
                  getAll('task', toggle ? 1 : -1);
                  setToggle(!toggle);
                }}
              >
                <FaArrowAltCircleDown />
              </IconButton>
            </Tooltip>
          </th>
          <th>
            Empregado
            <Tooltip title='ordenar'>
              <IconButton
                onClick={() => {
                  getAll('employee', toggle ? 1 : -1);
                  setToggle(!toggle);
                }}
              >
                <FaArrowAltCircleDown />
              </IconButton>
            </Tooltip>
          </th>
          <th>
            Condição
            <Tooltip title='ordenar'>
              <IconButton
                onClick={() => {
                  getAll('status', toggle ? 1 : -1);
                  setToggle(!toggle);
                }}
              >
                <FaArrowAltCircleDown />
              </IconButton>
            </Tooltip>
          </th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(({ date, task, employee, status, _id }) => (
          <tr key={_id}>
            <td>{convertDate(date)}</td>
            <td>{task}</td>
            <td>{employee}</td>
            <td className={status}>{status}</td>
            <td>
              <Tooltip title='deletar'>
                <IconButton onClick={() => removeTaskById(_id)}>
                  <FaTrashAlt className='icon__trash' />
                </IconButton>
              </Tooltip>
              <Tooltip title='editar'>
                <IconButton
                  onClick={() => updateTask(_id, task, employee, status)}
                >
                  <FaPencilAlt className='icon__pencil' />
                </IconButton>
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
}

Table.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      task: PropTypes.string.isRequired,
      employee: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
  removeTaskById: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  getAll: PropTypes.func.isRequired,
};
