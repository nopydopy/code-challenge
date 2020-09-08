import React, { useState, useEffect } from 'react';
import 'bulma';
import styles from './styles.module.scss';

import fetchPublicRepositories from '../../data/fetch-public-repositories';
import fetchPublicRepositoryData from '../../data/fetch-public-repository-data';

import ListView from '../list-view';
import DetailView from '../detail-view'

function App() {
  const [repoList, setRepoList] = useState([]);
  const [isDetailViewVisible, setIsDetailViewVisible] = useState(false);
  const [detailViewData, setDetailViewData] = useState();

  useEffect( () => {
    async function fetchData() {
      const response = await fetchPublicRepositories();
      setRepoList(response.data.search.nodes);
      console.log(response);
    }
    fetchData();
  }, []);

  function showDetailView(repoName, ownerLogin) {
    async function fetchData() {
      const response = await fetchPublicRepositoryData(repoName, ownerLogin, 5);
      setDetailViewData(response.data.repository);
      console.log(response.data.repository);
    }
    setIsDetailViewVisible(true);
    fetchData();
  }

  function closeDetailView() {
    setDetailViewData(null);
    setIsDetailViewVisible(false);
  }

  return (
    <div className={styles.container}>
      <h1 className="title is-1">Github Public Repository Explorer</h1>
      <DetailView
        visible={isDetailViewVisible}
        data={detailViewData}
        onClose={closeDetailView}
      />
      <ListView
        listData={repoList}
        onItemClick={showDetailView}
      />
    </div>
  );
}

export default App;
