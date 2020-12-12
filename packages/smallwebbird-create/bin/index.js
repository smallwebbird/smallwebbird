#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const figlet = require('figlet');
const inquirer = require('inquirer');
const { VueTemplate, ReactTemplate } = require('../templates');

const packageJSON = require('../package.json');

const cwd = process.cwd();

const Templates = {
  vue: VueTemplate,
  react: ReactTemplate,
};

function createInitDir(projectName) {
  return new Promise((r, j) => {
    if (projectName) {
      fs.mkdir(path.join(cwd, `./${String(projectName)}`), {}, (err) => {
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

async function getProjectName() {
  const { version } = packageJSON;
  return new Promise((r) => {
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

async function runCommand() {
  const projectName = await getProjectName();
  if (!projectName) {
    console.log(figlet.textSync('smallwebbird', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 200,
      whitespaceBreak: true,
    }));
    process.exit(1);
  }
  return projectName;
}

function showTempleteMsg() {
  return new Promise((r, j) => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'type',
          message: '请选择模板',
          choices: [
            'vue',
            'react',
          ],
        },
      ])
      .then((result) => {
        r(result.type);
      })
      .catch((err) => {
        j(err);
      });
  });
}

async function run() {
  const projectName = await runCommand();
  await createInitDir(projectName);
  // 创建模板
  const templateType = await showTempleteMsg();

  const template = new Templates[templateType](projectName);

  template.run();
}

run()
  .then(() => {

  })
  .catch((err) => {
    console.log(err);
  });
