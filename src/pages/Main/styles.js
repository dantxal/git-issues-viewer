import styled, { keyframes, css } from 'styled-components';

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
  }
`;
export const Logo = styled.img`
  margin-right: 10px;
  width: 40px;
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    border: ${props => (props.notFound ? '3px solid red' : '1px solid #eee')};
  }
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
`;
