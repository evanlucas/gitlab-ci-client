#!/usr/bin/env bash

rm -rf lib-cov
mkdir -p coverage
jscoverage lib lib-cov
GITLAB_CI_CLIENT_COV=1 mocha -R html-cov > coverage/coverage.html
GITLAB_CI_CLIENT_COV=1 mocha -R json-cov > coverage/coverage.json