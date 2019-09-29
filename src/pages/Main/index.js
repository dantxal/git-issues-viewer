import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';
import Container from '../../components/Container';
import { Header, Form, SubmitButton, List, Logo } from './styles';
import logo from '../../assets/logo.png';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      newRepo: '',
      repositories: [{ name: 'facebook/react' }],
      loading: false,
      notFound: false,
    };
  }

  // carregar dados do localstorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // salvar dados no localstorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, notFound: false });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { newRepo, repositories } = this.state;

    this.setState({ loading: true });
    try {
      if (repositories.find(repo => repo.name === newRepo)) {
        throw new Error('duplicateRepo');
      }
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      if (!data) throw new Error('404: Repository not found');
      this.setState({
        repositories: [...repositories, data],
        loading: false,
        newRepo: '',
      });
    } catch (err) {
      this.setState({ notFound: true, loading: false });
    }
  };

  render() {
    const { newRepo, loading, repositories, notFound } = this.state;

    return (
      <Container>
        <Header>
          <div>
            <Logo src={logo} alt="GRIV Logo" />
            <h1>Git Repository Issues Viewer</h1>
          </div>
          <Link to="/about">About</Link>
        </Header>
        <Form onSubmit={this.handleSubmit} notFound={notFound}>
          <input
            type="text"
            placeholder="Add repository 'author/repository`"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                See issues
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
