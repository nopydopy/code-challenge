import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss'

import ListItem from '../list-item';

function ListView({ listData, onItemClick }) {
  return (
    <ul className={styles.list}>
      {
        listData.map(listItemData => (
          <li
            className={styles['list-item']}
            key={listItemData.id}
          >
            <ListItem
              name={listItemData.name}
              description={listItemData.description}
              image={listItemData.openGraphImageUrl}
              user={listItemData.owner.login}
              onClick={() => { onItemClick(listItemData.name, listItemData.owner.login) }}
            />
          </li>
        ))
      }
    </ul>
  )
}

ListView.propTypes = {
  onItemClick: PropTypes.func,
  listData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    openGraphImageUrl: PropTypes.string,
    owner: PropTypes.shape({
      login: PropTypes.string,
    })
  })).isRequired,
};

ListView.defaultProps = {
  onItemClick: () => {},
}

export default ListView;