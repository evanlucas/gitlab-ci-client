var request = require('request')
  , util = require('util')

module.exports = Runners

function Runners(gitlab) {
  if (!(this instanceof Runners))
    return new Runners(gitlab)

  this.gitlab = gitlab
}

Runners.prototype.list = function(cb) {
  var opts = {
    json: true
  , strictSSL: this.gitlab.strictSSL
  }
  var u = '/api/v1/runners'
  opts.uri = this.gitlab.url(u)
  request.get(opts, function(err, res, body) {
    cb && cb(err, body, res)
  })
}

Runners.prototype.register = function(data, cb) {
  var opts = {
    json: true
  , strictSSL: this.gitlab.strictSSL
  , body: data
  }
  var u = '/api/v1/runners/register'
  opts.uri = this.gitlab.url(u)
  request.post(opts, function(err, res, body) {
    cb && cb(err, body, res)
  })
}
