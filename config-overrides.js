const bsconfig = require('./bsconfig.json');
const { compose } = require('react-app-rewired');

const addReactHotLoader = () => config => {
  config.module.rules[2].oneOf[1].options.plugins.push(
    'react-hot-loader/babel'
  );
  return config;
};

const excludeBsJsInEslint = () => config => {
  config.module.rules[1].exclude = new RegExp(`${bsconfig.suffix}$`);
  return config;
};

module.exports = compose(excludeBsJsInEslint(), addReactHotLoader());

