var request = require('request')
  , util = require('util')

module.exports = Builds

function Builds(gitlab) {
  if (!(this instanceof Builds))
    return new Builds(gitlab)

  this.gitlab = gitlab
}

Builds.prototype.run = function(token, cb) {
  if (!token)
    return cb && cb(new Error('The runner token is required'))
  var opts = {
    json: true
  , strictSSL: this.gitlab.strictSSL
  , body: {
      token: token
    }
  }
  var u = '/api/v1/builds/register'
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

Builds.prototype.update = function(id, token, data, cb) {
  if (!token)
    return cb && cb(new Error('The runner token is required'))
  data.token = token
  var opts = {
    json: true
  , strictSSL: this.gitlab.strictSSL
  , body: data
  }
  var u = '/api/v1/builds/'+id
  opts.uri = this.gitlab.url(u)
  request.put(opts, function(err, res, body) {
    if (err) return cb && cb(err)
    if (res.statusCode >= 400) {
      err = new Error('Received >= 400 status code')
      err.body = body
      return cb && cb(err)
    }
    cb(null, body)
  })
}
