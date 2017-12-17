const commonConfig = require('./bisheng.common.config');

module.exports = Object.assign({
  source: {
    components: './components',
  },
  output: './_site',
  theme: './src/theme',
  htmlTemplate: './src/theme/static/index.html',
  port: 8111,
}, commonConfig);
