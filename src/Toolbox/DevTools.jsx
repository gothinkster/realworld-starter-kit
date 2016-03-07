import React from 'react';

import {createDevTools} from 'redux-devtools';
import * as actions from '../actions/actionCreator.js';

import LogMonitor from 'redux-devtools-log-monitor';
import MultipleMonitors from 'redux-devtools-multiple-monitors';
import DockMonitor from 'redux-devtools-dock-monitor';
import Dispatcher from 'redux-devtools-dispatch';


const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h'
                 changePositionKey='ctrl-q'>
        <MultipleMonitors>
            <LogMonitor theme='solarized' />
            <Dispatcher actionCreators={actions}/>
        </MultipleMonitors>
    </DockMonitor>
);

export default DevTools;
