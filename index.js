module.exports = process.env.GITLAB_CI_CLIENT_COV
  ? require('./lib-cov')
  : require('./lib')
