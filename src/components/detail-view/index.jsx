import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import Loader from 'react-loader-spinner';
import { REPO_DATA } from '../../graphql/queries';
import styles from './styles.module.scss';

function DetailView({ repoName, ownerLogin }) {
  const { loading, data, error } = useQuery(REPO_DATA, {
    variables: {
      repoName,
      ownerLogin,
      lastAssignableUsers: 20,
    }
  });

  if (loading) return (
    <div className={styles['loader']}>
      <Loader
        type="TailSpin"
        color="#00bdb3"
        secondaryColor="#ffffff"
        width={80}
        height={80}
      />
    </div>
  )

  if (error) return (
    <div>
      <h2>Error</h2>
      <p>{error.toString()}</p>
    </div>
  )

  return (
    <div className={styles['detail-view']}>
      <h3>Created at:</h3>
      <p>{data.repository.createdAt}</p>
      {
        data.repository.releases.nodes[0] && (
          <>
            <h3>Latest Release:</h3>
            <p>{data.repository.releases.nodes[0].name}</p>
          </>
        )
      }
      <h3>Assignable Users:</h3>
      <ul className={styles.list}>
        {
          data.repository.assignableUsers.nodes.map(user => (
            <li key={user.id}>
              <a
                className={styles.link}
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>{user.name}</strong>
                <small>@{user.login}</small>
              </a>
            </li>
          ))
        }
      </ul>
      <br />
      <a
        className={styles.button}
        href={data.repository.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        View it on Github
      </a>
    </div>
  );
}

DetailView.propTypes = {
  repoName: PropTypes.string.isRequired,
  ownerLogin: PropTypes.string.isRequired,
}

export default DetailView;
