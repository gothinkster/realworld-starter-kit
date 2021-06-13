'use strict';

const cwd          = process.cwd(),
      fs           = require('fs-extra'),
      path         = require('path'),
      examplesPath = path.join(cwd, 'examples'),
      startDate    = new Date(),
      srcPath      = [
          '../node_modules/neo.mjs/src/',
          '../../node_modules/neo.mjs/src/',
          '../../../node_modules/neo.mjs/src/',
          '../../../../node_modules/neo.mjs/src/',
          '../../../../../node_modules/neo.mjs/src/'
      ],
      srcRegex = [
          /..\/src\//gi,
          /..\/..\/src\//gi,
          /..\/..\/..\/src\//gi,
          /..\/..\/..\/..\/src\//gi,
          /..\/..\/..\/..\/..\/src\//gi
      ];

// copy the examples folder
fs.mkdirpSync(examplesPath);
fs.copySync(path.join(cwd, 'node_modules/neo.mjs/examples'), examplesPath);

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile()
};

const parseFolder = (folderPath, index) => {
    let content, i, itemPath, prefix;

    fs.readdirSync(folderPath).forEach(itemName => {
        itemPath = path.join(folderPath, itemName);

        if (isFile(itemPath)) {
            if (itemName === 'neo-config.json') {
                content = require(itemPath);
                prefix  = '';

                for (i=0; i < index; i++) {
                    prefix += '../'
                }

                Object.assign(content, {
                    appPath       : prefix + content.appPath,
                    mainPath      : '../node_modules/neo.mjs/src/Main.mjs',
                    workerBasePath: `${prefix}../node_modules/neo.mjs/src/worker/`
                });

                fs.writeFileSync(itemPath, JSON.stringify(content, null, 4));
            } else if (itemName.endsWith('.mjs')) {
                content = fs.readFileSync(itemPath, 'utf8').replace(srcRegex[index], srcPath[index]);
                fs.writeFileSync(itemPath, content, 'utf8');
            }
        } else {
            parseFolder(itemPath, index + 1);
        }
    });
};

parseFolder(examplesPath, 0);

const processTime = (Math.round((new Date - startDate) * 100) / 100000).toFixed(2);
console.log(`Total time: ${processTime}s`);

process.exit();
