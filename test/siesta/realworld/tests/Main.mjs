import Main from '../../../../node_modules/neo.mjs/src/Main.mjs';

StartTest(t => {
    t.chain(
        next => {
            t.ok(Main, 'Main is imported as a JS module');
            next();
        },
        {
            waitFor: 'Selector', args: [ 'h1' ]
        },
        next => {
            t.click('.nav-link[href="#/login"]', next);
        },
        next => {
            t.is(t.query('h1')[0].innerHTML, 'Sign in');
            next();
        },
        {
            waitFor: 'Selector', args: [ 'h1' ]
        },
        next => {
            t.click('.nav-link[href="#/register"]', next);
        },
        next => {
            t.is(t.query('h1')[0].innerHTML, 'Sign up');
            t.done();
        }
    );
});