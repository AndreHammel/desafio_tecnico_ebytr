import React from 'react';
import { render, screen } from '@testing-library/react';
import { toBeDisabled } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import InputArea from '../components/InputArea';

describe('1 - teste dos inputs', () => {
  test('1.1 - O input onde as tarefa serão inseridas deve ser iniciado sem caracteres', () => {
    render(<InputArea />);
    const taskInputElement = screen.getByPlaceholderText(
      'Digite aqui a tarefa a ser inserida',
    );
    expect(taskInputElement.value).toBe('');
  });
  test('1.2 - O input onde o nome do empregado será inserido deve ser iniciado sem caracteres', () => {
    render(<InputArea />);
    const employeeInputElement = screen.getByPlaceholderText(
      'Digite o nome do empregado',
    );
    expect(employeeInputElement.value).toBe('');
  });
});

describe('2 - teste do botão', () => {
  test('2.1 - O botão deve ser inciado desabilitado', () => {
    render(<InputArea />);
    const btnElement = screen.getByRole('button');
    expect(btnElement).toBeDisabled();
  });

  test('2.2 - Caso o imput de tarefas recebe dados mas o imput de empregado esteja vazio o botão deve estar desativado', () => {
    render(<InputArea />);
    const btnElement = screen.getByRole('button');
    const taskInputElement = screen.getByPlaceholderText(
      'Digite aqui a tarefa a ser inserida',
    );
    userEvent.type(taskInputElement, 'Tarefa sendo digitada');
    expect(btnElement).toBeDisabled();
  });

  test('2.3 - Caso o imput de tarefas recebe dadose o imput de empregado receba dados o botão deve estar habilitado', () => {
    render(<InputArea />);
    const btnElement = screen.getByRole('button');
    const taskInputElement = screen.getByPlaceholderText(
      'Digite aqui a tarefa a ser inserida',
    );
    const employeeInputElement = screen.getByPlaceholderText(
      'Digite o nome do empregado',
    );
    userEvent.type(taskInputElement, 'Tarefa sendo digitada');
    userEvent.type(employeeInputElement, 'Tarefa sendo digitada');
    expect(btnElement).not.toBeDisabled();
  });
});
