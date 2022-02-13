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
    width: 100px;
    border-bottom: 2px solid black;
  }
  th:nth-of-type(5) {
    width: 150px;
    border-bottom: 2px solid black;
  }
  td svg {
    color: red;
  }
`;

export default TableContainer;
