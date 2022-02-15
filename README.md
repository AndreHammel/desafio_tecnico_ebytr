# Desafio Técnico Ebytr

Tabela de conteúdos
=================
<!--ts-->
  * [Tecnologias Utilizada](#tecnologias-utilizadas)
  * [Motivação & Objetivos](#Motivação--Objetivos)
    * [Funcionalidades da aplicação](#funcionalidades-da-aplicação)
    * [Características](#características)
  * [Interface](#Interface)
  * [Como instalar](#como-instalar)
    * [Download](#download)
    * [Iniciar o projeto](#iniciar-o-projeto)
  * [Utilizando os teste](#utilizando-os-teste)
    * [Back-end](#back-end)
      * [Taxa de cobertura](#taxa-de-cobertura)
  * [Lista de dependencias](#lista-de-dependencias)
    * [Back-end](#back-end)
    * [Front-end](#front-end)
  * [Links & Detalhes](#links--detalhes)
    * [Figma](#figma)
    * [Front-end](#deploy-front-end)
    * [Back-end](#deploy-front-end)
      * [Backend endpoints](#backend-endpoints)
      * [Exemplos de acesso](#exemplos-de-acesso)
  * [Futuras atualizações & refatorações](#futuras-atualizações--refatorações)
<!--te-->
## Tecnologias Utilizada
  ![javascript_language](https://user-images.githubusercontent.com/54488551/154150106-83a4f955-ecdc-4e8d-bb42-370412a1cfe0.png)![react](https://user-images.githubusercontent.com/54488551/154149932-cd5e451e-4384-40bc-8907-6ee50cb989c5.png)![node](https://user-images.githubusercontent.com/54488551/154150313-7e77d116-dfe0-4070-9bab-3790f03d0b62.png)
![mongodb](https://user-images.githubusercontent.com/54488551/154150227-4dc78f24-5d20-4f08-bf9a-97f5c45e4c78.png)![styled_components](https://user-images.githubusercontent.com/54488551/154152151-53f25e42-8893-4e61-b77e-c81bcdf36394.png)![material_ui](https://user-images.githubusercontent.com/54488551/154157869-0ab970ba-86de-470d-8fc4-b7ce7b783476.png)



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

### Características

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

## Utilizando os teste

### Back-end

```sh
$ cd backend
```

```sh
$ npm run tests
```

#### Taxa de cobertura

```sh
$ npm run coverage
```
![taxa cobertura](https://user-images.githubusercontent.com/54488551/154141214-0206fac0-f729-4765-87d2-86d2dce01c1e.png)




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

## Links & Detalhes


### [Figma](https://www.figma.com/file/Vli77MPIoMZMwpqSTtQDrX/Desafio-T%C3%A9cnico---Ebytr?node-id=0%3A1)

### [Deploy front-end](https://frontend-ebytr-1000.herokuapp.com/task-management)

### [Deploy back-end](https://backend-ebytr-1000.herokuapp.com/task)

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

* requisição de todas as tarefas\
:warning: Essa requisição GET precisar passar headers com as chaves column: 'data' e value: 1
![requisição de todas as tarefas](https://user-images.githubusercontent.com/54488551/154137855-a96789cc-4ff0-440c-80e2-ea8963736425.png)
* requisição para criar uma nova tarefa
![criar uma nova tarefa](https://user-images.githubusercontent.com/54488551/154138040-a85cdaf5-c6fb-4ccd-87cb-8bfcbf5bbdc8.png)
* requisição para atualizar uma tarefa
![atualizar uma tarefa](https://user-images.githubusercontent.com/54488551/154138074-7d552ef1-c297-448f-a84a-509c87f30167.png)
* requisição para remover uma tarefa
![remover uma tarefa](https://user-images.githubusercontent.com/54488551/154138086-2142a0c2-88b6-4512-9412-3c5bc85664af.png)

## Futuras atualizações & refatorações

* O método de fazer ordenação das colunas necessíta que toda vez seja feita um requisição para API, porem essa forma pode ser custosa e não muito eficiênte, para melhorar isso é melhor que a ordenação seja toda feita no front-end
* Quando feita a ordenação e logo após isso é feita uma adição de uma nova tarefa o resultado é que a tarefa é adicionada  porem a ordenação é perdida, é necessário que a ordenação se mantenha.
* Alguns pontos da parte de teste estão com código repetipo, é preciso refator essa parte.
* Na estilização também acontece muito código repetido, é preciso refatorar e extrair mais da capacidade do styled-components.