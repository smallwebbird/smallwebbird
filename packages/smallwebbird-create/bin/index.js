#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const figlet = require('figlet');

const packageJSON = require('../package.json');


const cwd = process.cwd();

async function run() {
  const projectName = await runCommand();
  await createInitDir(projectName);

}

function createInitDir (projectName) {
  return new Promise ((r, j) => {
    if (projectName) {
      fs.mkdir(path.join(cwd, `../${String(projectName)}`), {}, (err) => {
        if (err) {
            j(err);
        } else {
          r();
          console.log('初始化目录成功！！！');
        }
      });
    }
  });
}

async function runCommand () {
  let projectName = await getProjectName();
  if (!projectName) {
    console.log(figlet.textSync('smallwebbird', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 200,
      whitespaceBreak: true
    }));
    process.exit(1);
  }
  return projectName;
}

async function getProjectName () {
  const version = packageJSON.version;
  return new Promise((r, j) => {
    program
    .version(version)
    .arguments('[project-name]')
    .usage('输入目录')
    .action((projectName) => {
      r(projectName);
    });
    program.parse(process.argv);
  });
}

run()
  .then(() => {

  })
  .catch((err) => {
    console.log(err);
  });
