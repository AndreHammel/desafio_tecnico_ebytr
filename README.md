# Desafio Técnico Ebytr

## Motivação & Objetivos

  Simulação de caso onde uma empresa fictícia (Ebytr) necessita de um controle de tarefas, a aplicação deve ser **fullstak**, onde no back-end é feito com **NodeJS** utilizando o banco de dados **MongoDB**, na parte de front-end é feita com **React** utilizando o styled-components para estilização.

### Funcionalidades da aplicação

  - Visualização da lista de tarefas
  - A lista deve conter a data da criação da tarefa, nome do empregado que criou e a condição atual
  - Deve ser possível:
      * Inserir uma nova tarefa
      * Atualizar a tarefa
      * Remover uma tarefa da lista
  - As condições atuais possíveis de uma tarefa deve ser: pendente, em andamento e pronto

#### Características da funcionalidade

  - Número máximo de caracteres:
    * no campo de tarefa é 85 caracteres
    * no campo de empregado é 25 caracteres
  - O botão só se torna habilitado quando ambos os campos (tarefa e empregado) estão preenchidos
  - Ao editar um tarefa o botão de inserir muda para editar
  - Na fase de edição de uma tarefa aparece o botão (em formato de bomba) na qual pode-se cancelar a edição

## Interface
![ebytr](https://user-images.githubusercontent.com/54488551/154064637-8977b188-c114-46da-b5cf-a0caa04482b3.gif)

## Como instalar

### Download

```sh
$ git clone git@github.com:AndreHammel/desafio_tecnico_ebytr.git
```

```sh
$ cd desafio_tecnico_ebytr
```

### Iniciar o projeto

```sh
$ npm run dev:prestart
```

## Lista de dependencias

### Back-end

* body-parser: 1.19.1
* cors: 2.8.5
* dotenv: 16.0.0
* eslint-config-trybe-backend: 1.0.4
* express: 4.17.2
* http-status-codes: 2.2.0
* moment: 2.29.1
* mongodb: 4.3.1

### Front-end

* @mui/material: 5.4.1
* axios: 0.25.0
* prop-types: 15.8.1
* react: 17.0.2
* react-dom: 17.0.2
* react-icons: 4.3.1
* react-router-dom: 6.2.1
* react-scripts: 5.0.0
* styled-components: 5.3.3

## Links e Detalhes

### Figma

#### [Figma](https://www.figma.com/file/Vli77MPIoMZMwpqSTtQDrX/Desafio-T%C3%A9cnico---Ebytr?node-id=0%3A1)

### Frontend

#### [Deploy front-end](https://frontend-ebytr-1000.herokuapp.com/task-management)

### Backend

#### [Deploy back-end](https://backend-ebytr-1000.herokuapp.com/task)

#### Backend endpoints
```
backend endpoints
│
└─── retorna todas as tarefas:  /task
│
└─── cria uma nova tarefa: /task/new-task
│
└─── atualiza uma tarefa: /task/update-task
│
└─── remove uma tarefa: /task/remove-task
```
#### Exemplos de acesso

* requisição de todas as tarefas
:warning: Essa requisição GET precisar passar headers com chaves column: 'data' e value: 1
![requisição de todas as tarefas](https://user-images.githubusercontent.com/54488551/154137855-a96789cc-4ff0-440c-80e2-ea8963736425.png)
* requisição para criar uma nova tarefa
![criar uma nova tarefa](https://user-images.githubusercontent.com/54488551/154138040-a85cdaf5-c6fb-4ccd-87cb-8bfcbf5bbdc8.png)
* requisição para atualizar uma tarefa
![atualizar uma tarefa](https://user-images.githubusercontent.com/54488551/154138074-7d552ef1-c297-448f-a84a-509c87f30167.png)
* requisição para remover uma tarefa
![remover uma tarefa](https://user-images.githubusercontent.com/54488551/154138086-2142a0c2-88b6-4512-9412-3c5bc85664af.png)

### Futuras atualizações & refatorações