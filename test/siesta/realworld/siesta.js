const project = new Siesta.Project.Browser({
    scaleToFit: false
});

project.configure({
    title         : 'Neo test suite',
    isEcmaModule  : true,
    sandbox       : false,
    scaleToFit    : false,
    viewportHeight: 1500,
    viewportWidth : 1500
});

project.plan(
    {
        url    : 'tests/Main.mjs',
        preload: [
            {
                text: [
                    "Neo = self.Neo || {};",
                    "Neo.config = Neo.config || {};",
                    "Object.assign(Neo.config, {",
                        "appPath       : 'apps/realworld/app.mjs',",
                        "basePath      : '../../../node_modules/neo.mjs/',",
                        "environment   : 'development',",
                        "isExperimental: true,",
                        "isInsideSiesta: true,",
                        "themes        : [],",
                        "useFontAwesome: false,",
                        "workerBasePath: '../../../node_modules/neo.mjs/src/worker/'",
                    "});"
                ].join("")
            }
        ]
    }
);

project.start();