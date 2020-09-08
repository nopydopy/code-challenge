import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.scss';

function ListItem({ name, description, user, image, onClick }) {
  return (
    <div
      className={cn(
        'box',
        styles.container
      )}
      onClick={onClick}
    >
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img
              src={
                image ||
                'https://bulma.io/images/placeholders/128x128.png'
              }
              alt="Images"
            />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{ name }</strong>
              <small> @{ user }</small>
              <br />
              { description }
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

ListItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  user: PropTypes.string,
  onClick: PropTypes.func,
}

ListItem.defaultProps = {
  onClick: () => {},
}

export default ListItem;