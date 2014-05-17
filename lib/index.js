var request = require('request')
  , url = require('url')
  , qs = require('querystring')

module.exports = GitlabCI

function GitlabCI(opts) {
  if (!(this instanceof GitlabCI))
    return new GitlabCI(opts)

  if (!opts.apiUrl)
    throw new Error('opts.apiUrl is required')

  if (!opts.token)
    throw new Error('opts.token is required')

  if (!opts.gitlabUrl)
    throw new Error('opts.gitlabUrl is required')

  this.apiUrl = opts.apiUrl
  this.token = opts.token
  this.gitlabUrl = opts.gitlabUrl
  if (this.gitlabUrl[this.gitlabUrl.length-1] !== '/')
    this.gitlabUrl += '/'
  this.runnerToken = opts.runnerToken || null
  this.strictSSL = opts.hasOwnProperty('strictSSL')
                 ? opts.strictSSL
                 : true
  this.qs = '?'+qs.stringify({
    private_token: this.token
  , url: this.gitlabUrl
  })
  this.projects = require('./projects')(this)
  this.runners = require('./runners')(this)
  this.builds = require('./builds')(this)
}

GitlabCI.prototype.url = function(u) {
  return url.resolve(this.apiUrl, u+this.qs)
}

// GET /projects
// GET /projects/owned
// GET /projects/:id
// POST /projects
// PUT /projects/:id
// DELETE /projects/:id
// POST /projects/:id/runners/:runner_id
// DELETE /projects/:id/runners/:runner_id
// GET /runners
// POST /runners/register
// POST /builds/register
// PUT /builds/:id
