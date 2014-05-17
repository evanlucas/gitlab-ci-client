var http = require('http')
  , url_ = require('url')

module.exports = http.createServer(app)

function app(req, res) {
  var u = url(req.url)
  var method = req.method.toLowerCase()
/*   console.log(method, u) */
  switch (u) {
    case '/api/v1/projects':
      return projects(req, res)
    case '/api/v1/projects/owned':
      return owned(req, res)
    case '/api/v1/projects/271':
      return singleProject(req, res)
    default:
      return notFound(req, res)
  }
}

function url(url) {
  return url_.parse(url.replace(/\/\//g, '/')).pathname
}

function singleProject(req, res) {
  json(res, 200, {
    id: 271
  , name: "gitlabhq"
  , timeout: 1800
  , scripts: "ls"
  , token: "iPWx6WM4lhHNedGfBpPJNP"
  , default_ref: "master"
  , gitlab_url: "http///demo.gitlabhq.com/gitlab/gitlab-shell"
  , always_build: false
  , polling_interval: null
  , public: false
  , ssh_url_to_repo: "https://demo.gitlab.com/gitlab/gitlab-shell.git"
  , gitlab_id: 3
  })
}

function owned(req, res) {
  json(res, 200, [{
    id: 271
  , name: "gitlabhq"
  , timeout: 1800
  , scripts: "ls"
  , token: "iPWx6WM4lhHNedGfBpPJNP"
  , default_ref: "master"
  , gitlab_url: "http///demo.gitlabhq.com/gitlab/gitlab-shell"
  , always_build: false
  , polling_interval: null
  , public: false
  , ssh_url_to_repo: "https://demo.gitlab.com/gitlab/gitlab-shell.git"
  , gitlab_id: 3
  }, {
    id: 272
  , name: "gitlab-ci"
  , timeout: 1800
  , scripts: "ls"
  , token: "iPWx6WM4lhHNedGfBpPJNP"
  , default_ref: "master"
  , gitlab_url: "http///demo.gitlabhq.com/gitlab/gitlab-shell"
  , always_build: false
  , polling_interval: null
  , public: false
  , ssh_url_to_repo: "https://demo.gitlab.com/gitlab/gitlab-shell.git"
  , gitlab_id: 4
  }])
}

function projects(req, res) {
  json(res, 200, [{
    id: 271
  , name: "gitlabhq"
  , timeout: 1800
  , scripts: "ls"
  , token: "iPWx6WM4lhHNedGfBpPJNP"
  , default_ref: "master"
  , gitlab_url: "http///demo.gitlabhq.com/gitlab/gitlab-shell"
  , always_build: false
  , polling_interval: null
  , public: false
  , ssh_url_to_repo: "https://demo.gitlab.com/gitlab/gitlab-shell.git"
  , gitlab_id: 3
  }, {
    id: 272
  , name: "gitlab-ci"
  , timeout: 1800
  , scripts: "ls"
  , token: "iPWx6WM4lhHNedGfBpPJNP"
  , default_ref: "master"
  , gitlab_url: "http///demo.gitlabhq.com/gitlab/gitlab-shell"
  , always_build: false
  , polling_interval: null
  , public: false
  , ssh_url_to_repo: "https://demo.gitlab.com/gitlab/gitlab-shell.git"
  , gitlab_id: 4
  }])
}

function notFound(req, res) {
  json(res, 404, {
    status: 'error'
  })
}

function json(res, code, body) {
  res.writeHead(code, {
    'Content-Type': 'application/json'
  })
  res.end(JSON.stringify(body))
}