import { gql} from '@apollo/client';
import client from './apollo-client';


function fetchPublicRepositories() {
  return client.query({
    query: gql`
    query {
      search(query: "is:public", type: REPOSITORY, first: 10) {
        repositoryCount
        pageInfo {
          endCursor
          startCursor
        }
        nodes {
          ... on Repository {
            owner {
              login
            }
            openGraphImageUrl
            id
            name
            description
          }
        }
      }
    }
    `
  });
}

export default fetchPublicRepositories;