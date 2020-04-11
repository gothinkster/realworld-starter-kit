import jestFetchMock from 'jest-fetch-mock';
import MutationObserver from '@sheerun/mutationobserver-shim';

jestFetchMock.enableMocks();

global.MutationObserver = MutationObserver;

global.app = {
  backend: 'http://mock_your_requests',
};
