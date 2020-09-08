import React from 'react';
import { useQuery } from '@apollo/client';
import Loader from 'react-loader-spinner';

import styles from './styles.module.scss'

import { PUBLIC_REPO_SEARCH } from '../../graphql/queries';
import ListItem from '../list-item';


function ListView() {
  const { loading, error, data } = useQuery(PUBLIC_REPO_SEARCH);

  if (loading) return (
    <Loader
      type="TailSpin"
      color="#00bdb3"
      secondaryColor="#ffffff"
      width={80}
      height={80}
    />
  )

  if (error) return (
    <>
      <h2>Error</h2>
      <p>{error.toString()}</p>
    </>
  )

  return (
    <ul className={styles.list}>
      {
        data.search.nodes.map(listItemData => (
          <ListItem
            key={listItemData.id}
            name={listItemData.name}
            description={listItemData.description}
            image={listItemData.openGraphImageUrl}
            user={listItemData.owner.login}
          />
        ))
      }
    </ul>
  )
}

export default ListView;