import styled from 'styled-components';

const Container = styled.div`
  background: #fff;
  width: 90%;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;
  max-width: 600px;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
  @media (max-width: 600px) {
    margin: 20px auto;
  }
`;

export default Container;
