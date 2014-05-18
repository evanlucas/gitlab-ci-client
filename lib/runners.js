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
    if (err) return cb && cb(err)
    if (res.statusCode >= 400) {
      err = new Error('Received >= 400 status code')
      err.body = body
      return cb && cb(err)
    }
    cb(null, body)
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
    if (err) return cb && cb(err)
    if (res.statusCode >= 400) {
      err = new Error('Received >= 400 status code')
      err.body = body
      return cb && cb(err)
    }
    cb(null, body)
  })
}
