var request = require('request')
  , util = require('util')

module.exports = Builds

function Builds(gitlab) {
  if (!(this instanceof Builds))
    return new Builds(gitlab)

  this.gitlab = gitlab
}

Builds.prototype.run = function(cb) {
  if (!this.gitlab.runnerToken)
    return cb && cb(new Error('opts.runnerToken is required'))
  var opts = {
    json: true
  , strictSSL: this.gitlab.strictSSL
  , body: {
      token: this.gitlab.runnerToken
    }
  }
  var u = '/api/v1/builds/register'
  opts.uri = this.gitlab.url(u)
  request.post(opts, function(err, res, body) {
    cb && cb(err, body, res)
  })
}

Builds.prototype.update = function(id, data, cb) {
  if (!this.gitlab.runnerToken)
    return cb && cb(new Error('opts.runnerToken is required'))
  if (!data.token) data.token = this.gitlab.runnerToken
  var opts = {
    json: true
  , strictSSL: this.gitlab.strictSSL
  , body: data
  }
  var u = '/api/v1/builds/'+id
  opts.uri = this.gitlab.url(u)
  request.put(opts, function(err, res, body) {
    cb && cb(err, body, res)
  })
}
