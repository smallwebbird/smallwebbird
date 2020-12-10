#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const cwd = process.cwd();

fs.mkdir(path.join(cwd, './abc'), {}, (err) => {
  if (err) {
    console.log('创建文件夹成功');
  }
});
