import { homedir } from 'os';
import test from 'ava';
import execa from 'execa';
import fs from 'fs-extra';

import isGit from './';

const isGitRequired = require('./');

const randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

test.serial('check if something is added in process.cwd() - manipulated', (t) => {
  fs.writeFileSync(`${randomString}.js`, 'console.log();');
  execa.sync('git', ['add', `${randomString}.js`]);

  t.true(isGit());
  t.true(isGitRequired());

  execa.sync('git', ['reset', 'HEAD', `${randomString}.js`]);
  fs.removeSync(`${randomString}.js`);
});

test('check if something is added in process.cwd()', (t) => {
  t.false(isGit());
});

test('check if something is added in users home', (t) => {
  t.false(isGit(homedir()));
});
