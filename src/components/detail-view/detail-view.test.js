import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import DetailView from './index';
import { REPO_DATA } from '../../graphql/queries';

const resultFunctionMock = jest.fn();

const mocks = [
  {
    request: {
      query: REPO_DATA,
      variables: {
        repoName: 'TestRepo',
        ownerLogin: 'TestLogin',
        lastAssignableUsers: 20,
      }
    },
    result: () => {
      resultFunctionMock();
      return {
        data: {
          repository: {
            assignableUsers: {
              nodes: []
            },
            createdAt: '013-09-23T21:16:45Z',
            diskUsage: 609870,
            name: 'TestRepo',
            releases: {
              nodes: []
            },
            url: 'TestRepoURL'
          },
        }
      }
    }
  }
];

async function updateWrapper(wrapper, amount = 0) {
  await act(async () => {
    await wait(amount);
    wrapper.update();
  });
}


describe('<DetailView>', () => {
  it('renders without error', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DetailView repoName="TestRepo" ownerLogin="TestLogin" />
      </MockedProvider>
    );
    await updateWrapper(wrapper);
    expect(resultFunctionMock).toHaveBeenCalledTimes(1);
  });

  it('renders createdAt field', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DetailView repoName="TestRepo" ownerLogin="TestLogin" />
      </MockedProvider>
    );
    await updateWrapper(wrapper);
    expect(wrapper.contains('013-09-23T21:16:45Z')).toBe(true);
  });
})

