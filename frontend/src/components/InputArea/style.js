import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin-top: 50px;

  fieldset {
    background: var(--pink-300);
    max-width: 1280px;
    height: 110px;
    margin: 0 auto;
    border-radius: 15px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 50px;

    legend {
      font-size: 20px;
      margin-left: 50px;
    }

    input,
    button,
    select {
      background: var(--white);
      height: 30px;
      border-radius: 8px;
      outline: none;
      border: 0;
      padding: 0 8px;
    }

    .input-task {
      width: 500px;
    }

    button {
      width: 150px;
      background: var(--blue-500);
      color: var(--white);
      transition: background 0.2s;

      &:hover {
        background: var(--blue-900);
      }

      &:disabled {
        background: rgba(0, 0, 0, 0.3);
      }
    }
  }
`;

export default Container;
