import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Loading, Owner, IssuesList, FilterList } from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  constructor() {
    super();

    this.state = {
      repository: {},
      issues: [],
      loading: true,
      filters: ['all', 'open', 'closed'],
      selectedFilter: 'all',
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'all',
          per_page: 5,
        },
      }),
    ]);

    console.log(repository);
    console.log(issues);
    this.setState({
      repository: repository.data,
      issues: [...issues.data],
      loading: false,
    });
  }

  handleSelectFilter = async filterName => {
    const { selectedFilter } = this.state;
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    if (selectedFilter === filterName) return;
    try {
      const issues = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filterName,
          per_page: 5,
        },
      });
      this.setState({ issues: [...issues.data] });
    } catch (err) {
      this.setState({ issues: [] });
    }
    this.setState({ selectedFilter: filterName });
  };

  render() {
    const { repository, issues, loading, filters, selectedFilter } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <FilterList>
          {filters.map(filter => (
            <li key={filter}>
              <button
                type="button"
                className={selectedFilter === filter ? 'active' : ''}
                onClick={() => this.handleSelectFilter(filter)}
              >
                {filter}
              </button>
            </li>
          ))}
        </FilterList>
        <IssuesList>
          {issues.length ? (
            issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))
          ) : (
            <p>No issues found</p>
          )}
        </IssuesList>
      </Container>
    );
  }
}
