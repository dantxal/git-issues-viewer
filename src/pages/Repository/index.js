import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSpinner, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {
  Loading,
  Owner,
  IssuesList,
  FilterList,
  Pagination,
  FilterSection,
} from './styles';
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
      currentPage: 1,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { selectedFilter, currentPage } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: selectedFilter,
          per_page: 5,
          page: currentPage,
        },
      }),
    ]);
    this.setState({
      repository: repository.data,
      issues: [...issues.data],
      loading: false,
    });
  }

  handleSelectFilter = async filterName => {
    const { selectedFilter } = this.state;
    if (selectedFilter === filterName) return;
    await this.setState({ selectedFilter: filterName });

    this.updateIssues();
  };

  handleChangePage = value => {
    const { currentPage } = this.state;

    if (currentPage < 2 && value < 1) return;

    this.setState(
      () => ({
        currentPage: currentPage + value,
      }),
      () => this.updateIssues()
    );
  };

  updateIssues = async () => {
    const { match } = this.props;
    const { selectedFilter, currentPage } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: selectedFilter,
        per_page: 5,
        page: currentPage,
      },
    });
    this.setState({ issues: [...issues.data] });
  };

  render() {
    const {
      repository,
      issues,
      loading,
      filters,
      selectedFilter,
      currentPage,
    } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner color="#FFF" size={60} />
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">
            <FaArrowLeft size={13} color="#7159c1" />
            Back
          </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <FilterSection>
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
          <Pagination>
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => this.handleChangePage(-1)}
            >
              back
            </button>
            <p>{currentPage}</p>
            <button type="button" onClick={() => this.handleChangePage(1)}>
              next
            </button>
          </Pagination>
        </FilterSection>
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
