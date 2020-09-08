import { gql} from '@apollo/client';

const REPO_DATA = gql`
  query repoData($repoName: String!, $ownerLogin: String!, $lastAssignableUsers: Int!) {
    repository(name: $repoName, owner: $ownerLogin) {
      name
      url
      createdAt
      diskUsage
      releases(last: 1) {
        nodes {
          name
        }
      }
      assignableUsers(last: $lastAssignableUsers) {
        nodes {
          login
          name
          id
          url
        }
      }
    }
  }
`;

const PUBLIC_REPO_SEARCH = gql`
  query publicRepoSearch {
    search(query: "is:public", type: REPOSITORY, first: 24) {
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
`;

export { PUBLIC_REPO_SEARCH, REPO_DATA };