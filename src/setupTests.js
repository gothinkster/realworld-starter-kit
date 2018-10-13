// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import 'react-testing-library/cleanup-after-each';
import jestFetchMock from 'jest-fetch-mock';

global.fetch = jestFetchMock;

