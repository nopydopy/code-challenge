import { gql} from '@apollo/client';
import client from './apollo-client';

const GET_REPO_DATA = gql`
  query repoData($repoName: String!, $ownerLogin: String!, $lastAssignableUsers: Int!) {
    repository(name: $repoName, owner: $ownerLogin) {
      name
      url
      createdAt
      description
      openGraphImageUrl
      owner {
        login
      }
      assignableUsers(last: $lastAssignableUsers) {
        nodes {
          name
          id
          url
        }
      }
    }
  }
`;

function fetchPublicRepositoryData(repoName, ownerLogin, lastAssignableUsers) {
  const variables = { repoName, ownerLogin, lastAssignableUsers };
  return client.query({
    query: GET_REPO_DATA,
    variables,
  });
}

export default fetchPublicRepositoryData;