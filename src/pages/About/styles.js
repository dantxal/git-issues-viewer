import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    flex-direction: row;
  }
  > a {
    color: #7159c1;
    font-size: 16px;
    opacity: 0.7;
    text-decoration: none;
    font-weight: bold;

    transition: opacity 0.1s;
    &:hover {
      opacity: 1;
    }
    svg {
      margin-right: 3px;
    }
  }
`;
export const Logo = styled.img`
  margin-right: 10px;
  width: 40px;
`;
export const Section = styled.section`
  margin-top: 30px;
  line-height: 1.4;
  a {
    text-decoration: none;
    font-weight: bold;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
`;
