//React and friends (3rd party libs)
import React from 'react';
//subcomponents
//Sass and assets (webpack uses require)
require('./HelloWorld.scss')

export default React.createClass({
    render: function() {
        return (
            <div>
                <h1>Hello World</h1>
            </div>
        );
    }
});
