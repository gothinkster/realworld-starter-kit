import { hot } from 'react-hot-loader';
import React, { StrictMode } from 'react';
import App from './App.bs';

const HotApp = () => <StrictMode><App /></StrictMode>

export default hot(module)(HotApp);
