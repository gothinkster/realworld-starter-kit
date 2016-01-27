//React and friends (other 3rd party libs)
import React from 'react';
import ReactDom from 'react-dom';
//App components
import HelloWorld from './HelloWorld/HelloWorld';
//Scss (webpacked)
require('./index.scss');

ReactDom.render(
    <HelloWorld />,
    document.getElementById('app')
)
