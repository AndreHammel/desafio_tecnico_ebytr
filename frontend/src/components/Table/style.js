import styled from 'styled-components';

const TableContainer = styled.table`
  width: 1280px;
  margin: 0 auto;
  border: 1px solid var(--black);
  border-radius: 10px;
  padding: 20px 5px 20px;

  th:nth-of-type(1) {
    width: 200px;
    border-bottom: 2px solid black;
  }
  th:nth-of-type(2) {
    width: 500px;
    border-bottom: 2px solid black;
  }
  th:nth-of-type(3) {
    width: 200px;
    border-bottom: 2px solid black;
  }

  th:nth-of-type(4) {
    width: 130px;
    border-bottom: 2px solid black;
  }
  th:nth-of-type(5) {
    width: 100px;
    border-bottom: 2px solid black;
  }

  td:nth-of-type(4) {
    text-align: center;
  }

  td:nth-of-type(5) {
    text-align: center;
  }

  .icon__trash {
    color: var(--red);
  }

  .icon__pencil {
    color: var(--green);
  }

  .pendente {
    color: var(--blue-900);
    border-radius: 10px;
    border: 4px solid var(--blue-900);
    background: none;
  }
  .andamento {
    color: var(--pink-300);
    border-radius: 10px;
    border: 4px solid var(--pink-300);
    background: none;
  }
  .pronto {
    color: var(--green-banner);
    border-radius: 10px;
    border: 4px solid var(--green-banner);
    background: none;
  }
  svg {
    font-size: 17px;
    margin-left: 3px;
  }
`;

export default TableContainer;
