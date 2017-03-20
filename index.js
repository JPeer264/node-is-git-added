import execa from 'execa';
import isGit from 'is-git-repository';

const cwd = process.cwd();

const isGitAdded = (altPath = cwd) => {
  if (!isGit(altPath)) {
    return false;
  }

  try {
    execa.shellSync(`(cd ${altPath} ; git diff --cached --exit-code)`);

    return false;
  } catch (e) {
    return true;
  }
};

export default isGitAdded;
