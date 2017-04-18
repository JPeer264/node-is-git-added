import { platform } from 'os';
import execa from 'execa';
import isGit from 'is-git-repository';

const cwd = process.cwd();

const isGitAdded = (altPath = cwd) => {
  if (!isGit(altPath)) {
    return false;
  }

  try {
    if (platform() === 'win32') {
      execa.shellSync(`pushd ${altPath} & git diff --cached --exit-code`);
    } else {
      execa.shellSync(`(cd ${altPath} ; git diff --cached --exit-code)`);
    }

    return false;
  } catch (e) {
    return true;
  }
};

export default isGitAdded;
