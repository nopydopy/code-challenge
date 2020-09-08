import React from 'react';
import { ApolloProvider } from '@apollo/client';

import styles from './styles.module.scss';
import client from '../../graphql/apollo-client';
import ListView from '../list-view';

function App() {
  return (
    <ApolloProvider client={client}>
      <main className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.headline}>Github Public Repository Explorer</h1>
        </header>
        <ListView />
      </main>
    </ApolloProvider>
  );
}

export default App;
