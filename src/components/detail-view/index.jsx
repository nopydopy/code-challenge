import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.scss';

function DetailView({ visible, data, onClose }) {
  return (
    <div
      className="modal"
      style={{
        display: visible ? 'block' : 'none',
      }}
    >
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            { data ? `${data.name} @${data.owner.login}` : 'Loading' }
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          />
        </header>
        <section
          className={cn(
            'modal-card-body',
            styles['modal-card-body']
          )}
        >
          {
            data
            ? (
              <>
                <img
                  src={data.openGraphImageUrl}
                  alt="OpenGraph"
                  className={styles.image}
                />
                <p class="subtitle is-4">Description:</p>
                <p>{data.description}</p>
                <p class="subtitle is-4">Assignable Users:</p>
                <ul>
                  {
                    data.assignableUsers.nodes.map(user => (
                      <li key={user.id}>
                        <a
                          href={user.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link"
                        >
                          {user.name}
                        </a>
                      </li>
                    ))
                  }
                </ul>
                <a
                  className="button"
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on github.com
                </a>
              </>
            )
            : 'Loading'
          }
        </section>
        <footer className="modal-card-foot">
          { !data && (
            <progress className="progress is-small is-primary" max="100" />
          )}
        </footer>
      </div>
    </div>
  )
}

DetailView.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.shape({
    name: PropTypes.string,
    createdAt: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.shape({
      login: PropTypes.string,
    }),
    assignableUsers: PropTypes.object,
  }),
}

DetailView.defaultProps = {
  visible: false,
  onClose: () => {},
}

export default DetailView;
