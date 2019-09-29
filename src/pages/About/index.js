import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import Container from '../../components/Container';
import { Header, Logo, Section } from './styles';
import logo from '../../assets/logo.png';

export default function About() {
  return (
    <Container>
      <Header>
        <div>
          <Logo src={logo} alt="GRIV Logo" />
          <h1>Git Repository Issues Viewer</h1>
        </div>
        <Link to="/">
          <FaArrowLeft size={13} color="#7159c1" />
          Back to main
        </Link>
      </Header>
      <Section>
        <p>
          {`This is a non-commercial app, built by `}
          <a href="https://www.linkedin.com/in/daniel-teixeira-faria/">
            dantxal
          </a>
          {` during `}
          <a href="https://rocketseat.com.br/bootcamp">
            Rocketseat&apos;s Bootcamp 8.0.
          </a>
        </p>
        <br />
        <p>
          It consumes github&apos;s api and allows you to keep track of your
          favorite git repositories with a simplified UI. Explore the repos you
          like and find some issues to solve, and feel great doing it.
        </p>
      </Section>
    </Container>
  );
}
