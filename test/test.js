var should = require('should')
var server = require('./fixtures/server')
var Client = require('../')

describe('gitlab-ci-client', function() {
  before(function(done) {
    this.server = server.listen(0, function(err) {
      if (err) return done(err)
      this.port = this.server.address().port
      this.client = new Client({
        apiUrl: 'http://localhost:'+this.port
      , token: 'fasdfasdf'
      , gitlabUrl: 'http://gitlab.com'
      })
      done()
    }.bind(this))
  })

  it('should allow getting all projects', function(done) {
    this.client.projects.list(function(err, projects, res) {
      if (err) return done(err)
      projects.should.be.instanceOf(Array)
      projects.length.should.equal(2)
      done()
    })
  })

  it('should allow getting owned projects', function(done) {
    this.client.projects.list('owned', function(err, projects, res) {
      if (err) return done(err)
      projects.should.be.instanceOf(Array)
      projects.length.should.equal(2)
      done()
    })
  })

  it('should allow getting a single project', function(done) {
    this.client.projects.list(271, function(err, project, res) {
      if (err) return done(err)
      project.should.be.type('object')
      project.should.have.property('id', 271)
      done()
    })
  })
})