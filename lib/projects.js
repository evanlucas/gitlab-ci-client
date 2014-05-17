var request = require('request')
  , util = require('util')

module.exports = Projects

function Projects(gitlab) {
  if (!(this instanceof Projects))
    return new Projects(gitlab)

  this.gitlab = gitlab
}

Projects.prototype.list = function(id, cb) {
  if ('function' === typeof id) cb = id, id = null
  var opts = {
    json: true
  , strictSSL: this.gitlab.strictSSL
  }
  var u = '/api/v1/projects'
  if (id) u += '/'+id
  opts.uri = this.gitlab.url(u)
  request.get(opts, function(err, res, body) {
    cb && cb(err, body, res)
  })
}

Projects.prototype.create = function(data, cb) {
  if (data.scripts && Array.isArray(data.scripts)) {
    data.scripts = data.scripts.join('\r\n')
  }
  var opts = {
    json: true
  , strictSSL: this.gitlab.strictSSL
  , body: data
  }
  var u = '/api/v1/projects'
  opts.uri = this.gitlab.url(u)
  request.post(opts, function(err, res, body) {
    cb && cb(err, body, res)
  })
}

Projects.prototype.update = function(id, data, cb) {
  if (data.scripts && Array.isArray(data.scripts)) {
    data.scripts = data.scripts.join('\r\n')
  }
  var opts = {
    json: true
  , strictSSL: this.gitlab.strictSSL
  , body: data
  }
  var u = '/api/v1/projects/'+id
  opts.uri = this.gitlab.url(u)
  request.put(opts, function(err, res, body) {
    cb && cb(err, body, res)
  })
}

Projects.prototype.del = function(id, cb) {
  var opts = {
    json: true
  , strictSSL: this.gitlab.strictSSL
  }
  var u = '/api/v1/projects/'+id
  opts.uri = this.gitlab.url(u)
  request.del(opts, function(err, res, body) {
    cb && cb(err, body, res)
  })
}

Projects.prototype.link = function(id, runnerId, cb) {
  var opts = {
    json: true
  , strictSSL: this.gitlab.strictSSL
  }
  var u = util.format('/api/v1/projects/%s/runners/%s', id, runnerId)
  opts.uri = this.gitlab.url(u)
  request.post(opts, function(err, res, body) {
    cb && cb(err, body, res)
  })
}

Projects.prototype.unlink = function(id, runnerId, cb) {
  var opts = {
    json: true
  , strictSSL: this.gitlab.strictSSL
  }
  var u = util.format('/api/v1/projects/%s/runners/%s', id, runnerId)
  opts.uri = this.gitlab.url(u)
  request.del(opts, function(err, res, body) {
    cb && cb(err, body, res)
  })
}
