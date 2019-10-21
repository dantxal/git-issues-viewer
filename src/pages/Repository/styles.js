import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;
export const Loading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    align-self: flex-start;
    font-weight: bold;
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
    svg {
      margin-right: 5px;
    }
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10ox;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssuesList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const FilterList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  list-style: none;

  li {
    & + li {
      margin-left: 5px;
    }
    button {
      background: #ddd;
      padding: 6px 8px;
      border-radius: 3px;
      border: none;
      &.active {
        background: #7159c1;
        color: #fff;
        font-weight: 600;
      }
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  button {
    background: #ddd;
    padding: 6px 8px;
    border-radius: 3px;
    border: none;
    font-weight: 600;

    &:hover {
      background: #eee;
    }
    &:active {
      background: #7159c1;
      color: #fff;
    }
    & + button {
      margin-left: 5px;
    }
    &[disabled] {
      color: #aaa;
      cursor: default;
      &:hover {
        background: #ddd;
      }
    }
  }

  p {
    font-weight: 300;
    margin: 0 10px;
  }
`;

export const FilterSection = styled.section`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    height: 60px;
    flex-direction: column;
    justify-content: space-between;
  }
`;
