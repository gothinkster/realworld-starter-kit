import '@testing-library/react/cleanup-after-each';
import jestFetchMock from 'jest-fetch-mock';

jestFetchMock.enableMocks();

global.app = {
  backend: 'http://mock_your_requests',
};
