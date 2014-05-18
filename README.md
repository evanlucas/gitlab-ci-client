# gitlab-ci-client

Easy access to GitLab CI for node

## Install

```bash
$ npm install --save gitlab-ci-client
```

## Tests

```bash
$ npm test
```

## Coverage

```bash
$ npm run cover
```

## Usage

```js
var gitlab = require('gitlab-ci-client')({
  apiUrl: 'https://ci.gitlab.com'
, token: '<your token>'
, gitlabUrl: 'https://gitlab.com'
, strictSSL: true
, runnerToken: '<your runner token>'
})
```

## API

### Projects

```js
var projects = gitlab.projects
```

#### Projects.list()

List all projects, all owned projects, or a single project with the given _id_

##### Params

| Name | Type | Desc |
| ---- | ---- | ---- |
| id | String, Number | `owned` or project id (optional) |
| cb | Function | `function(err, projects, res)` |

#### Projects.create()

Create a new project with the given _data_

##### Params

| Name | Type | Desc |
| ---- | ---- | ---- |
| data | Object | The params to create |
| cb | Function | `function(err, body, res)` |

Where `data` requires:

- `name` The project name
- `gitlab_id` The GitLab Project ID
- `gitlab_url` The web url of the project on GitLab
- `ssh_url_to_repo` The ssh url of the project on GitLab

And can also have:

- `scripts` (Array or string)
- `default_ref` (Defaults to master)

#### Projects.update()

Updates the project with the given _id_

##### Params

| Name | Type | Desc |
| ---- | ---- | ---- |
| id | String, Number | The project id |
| data | Object | The params to create |
| cb | Function | `function(err, body, res)` |

Where `data` requires:

- `name` The project name
- `gitlab_id` The GitLab Project ID
- `gitlab_url` The web url of the project on GitLab
- `ssh_url_to_repo` The ssh url of the project on GitLab

And can also have:

- `scripts` (Array or string)
- `default_ref` (Defaults to master)

#### Projects.del()

Deletes the project with the given _id_

##### Params

| Name | Type | Desc |
| ---- | ---- | ---- |
| id | String, Number | The project id |
| cb | Function | `function(err, body, res)` |

#### Projects.link()

Adds a runner to the given project _id_

##### Params

| Name | Type | Desc |
| ---- | ---- | ---- |
| id | String, Number | The project id |
| runnerId | String, Number | The runner id |
| cb | Function | `function(err, body, res)` |

#### Projects.unlink()

Remove a runner from the given project _id_

##### Params

| Name | Type | Desc |
| ---- | ---- | ---- |
| id | String, Number | The project id |
| runnerId | String, Number | The runner id |
| cb | Function | `function(err, body, res)` |

### Runners

```js
var runners = gitlab.runners
```

#### Runners.list()

List all of the registered runners

##### Params

| Name | Type | Desc |
| ---- | ---- | ---- |
| cb | Function | `function(err, body, res)` |

#### Runners.register()

Registers the runner with the given _data_

##### Params

| Name | Type | Desc |
| ---- | ---- | ---- |
| data | Object | The runner info |
| cb | Function | `function(err, body, res)` |

### Builds

```js
var builds = gitlab.builds
```

#### Builds.run()

Tells the coordinator to run this next build

##### Params

| Name | Type | Desc |
| ---- | ---- | ---- |
| token | String | The runner token |
| cb | Function | `function(err, body, res)` |

#### Builds.update()

Updates the coordinator with the info for the given build _id_

##### Params

| Name | Type | Desc |
| ---- | ---- | ---- |
| id | Number | The build id |
| token | String | The runner token |
| data | Object | The build info |
| cb | Function | `function(err, body, res)` |

Where data can have:

- `state` (String)
- `trace` (String)

***

### Author

Evan Lucas

### License

MIT
