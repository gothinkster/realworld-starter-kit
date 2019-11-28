import Main from '../../../../node_modules/neo.mjs/src/Main.mjs';

StartTest(t => {
    t.it("Sanity", t => {
        t.ok(Main, 'Main is imported as a JS module');
    });
});