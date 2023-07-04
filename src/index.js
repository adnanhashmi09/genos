#!/usr/bin/env node
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unreachable */

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const async = require('async');
const { exec } = require('child_process');
const chalk = require('chalk');
const figlet = require('figlet');
const gradient = require('gradient-string');
const { createSpinner } = require('nanospinner');
const { QUESTIONS } = require('./QUESTIONS');
const { createDirectoryContents } = require('./UTILITY');

inquirer.registerPrompt('directory', require('inquirer-select-directory'));
// Get the current working directory
const CURR_DIR = process.cwd();

const genos = async (ques) => {
  console.clear();
  // console.log(figlet.fontsSync());
  console.log(
    gradient.retro.multiline(
      figlet.textSync('Genos', {
        font: '3D-ASCII',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true,
      })
    )
  );

  console.log(
    `${chalk.cyan(`Welcome to ${chalk.bold('Genos')} v2.0.2 \n`)}`
  );

  console.log(
    `${chalk.cyan(`Let's jumpstart your project with generated starter files.`)} \n \n`
  );

  let projectName;
  let answers;
  try {
    answers = await inquirer.prompt(ques);
    const projectChoice = answers['project-choice'];
    projectName = answers['project-name'];
    const detailsKeys = Object.keys(answers).filter((el) =>
      el.includes('detail')
    );

    const details = detailsKeys.map((el) => answers[el]);

    const templatePath = path.join(
      __dirname,
      '..',
      'templates',
      projectChoice,
      ...details
    );

    fs.mkdirSync(path.join(answers.destination, projectName));
    createDirectoryContents(
      templatePath,
      projectName,
      answers.destination,
      answers.author,
      answers.description
    );
  } catch (e) {
    if (e.message.includes('file already exists')) {
      console.log(e.message);
      process.exit(1);
    }
    console.log(e.message);
    fs.rmdirSync(path.join(answers.destination, projectName), {
      recursive: true,
      force: true,
    });
    process.exit(1);
  }

  async.series([
    () => {
      process.chdir(`${answers.destination}/${projectName}`);
      const spinner = createSpinner('Downloading the packages...').start();
      exec('yarn install', (error, stdout, stderr) => {
        if (error) {
          spinner.error({ text: 'Error downloading the packages' });
        } else {
          spinner.success({ text: 'Ready' });
          console.log('\n');
          console.log(
            gradient.retro.multiline(
              figlet.textSync('Happy Coding', {
                font: 'Standard',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width: 80,
                whitespaceBreak: true,
              })
            )
          );
          console.log('\n \n');
        }
      });
    },
  ]);
};

genos(QUESTIONS);
