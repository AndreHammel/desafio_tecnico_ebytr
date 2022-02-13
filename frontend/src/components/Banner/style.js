import styled from 'styled-components';

const Container = styled.div`
  height: 120px;
  background: var(--green-banner);
  div {
    align-items: center;
    color: var(--pink-300);
    display: flex;
    font-family: 'Montserrat', sans-serif;
    font-size: 60px;
    font-weight: 700;
    height: 100%;
    letter-spacing: 6px;
    margin: auto;
    max-width: 1280px;
    text-shadow: 7px 4px 5px rgba(0, 0, 0, 0.7);
  }
`;

export default Container;
