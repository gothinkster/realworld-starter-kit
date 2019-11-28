import Main from '../../../../api/Base.mjs';

StartTest(t => {
    t.it("Sanity", t => {
        t.ok(Main, 'api.Base is imported as a JS module');
    });
});