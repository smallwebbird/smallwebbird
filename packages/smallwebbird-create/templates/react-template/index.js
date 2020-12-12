const fs = require('fs');
const path = require('path');

const cwd = process.cwd();

class ReactTemplate {
  constructor(projectName) {
    this.projectName = projectName;
  }

  createSrcDir = () => {
    fs.mkdir(path.join(cwd, `./${this.projectName}/src`), {}, (err) => {
      if (err) { throw err; }
      fs.writeFile(path.join(cwd, `./${this.projectName}/src/App.js`), 'class App {}', { encoding: 'utf-8' }, (err1) => {
        if (err1) { throw err1; }
        console.log('src目录创建成功');
      });
    });
  }

  createPackageJson = () => {
    fs.readFile(path.join(__dirname, './config/packageJsonTemplate.json'), { encoding: 'utf-8' }, (err, data) => {
      if (err) { throw err; }
      fs.writeFile(path.join(cwd, `./${this.projectName}/package.json`), data, { encoding: 'utf-8' }, (err1) => {
        if (err1) { throw err1; }
        console.log('创建package.json成功');
      });
    });
  }

  run() {
    this.createPackageJson();
    this.createSrcDir();
  }
}

module.exports = ReactTemplate;
