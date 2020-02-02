require('jest-fetch-mock').enableMocks();

global.app = {
  backend: 'http://mock_your_requests',
};
