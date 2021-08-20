#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const async = require('async');
const { exec } = require('child_process');
const { QUESTIONS } = require('./QUESTIONS');
const { createDirectoryContents } = require('./UTILITY');

// Get the current working directory
const CURR_DIR = process.cwd();

const genos = async (ques) => {
	let projectName;
	try {
		const answers = await inquirer.prompt(ques);
		const projectChoice = answers['project-choice'];
		projectName = answers['project-name'];
		const templatePath = path.join(__dirname, '..', 'templates', projectChoice);

		fs.mkdirSync(path.join(CURR_DIR, projectName));
		createDirectoryContents(
			templatePath,
			projectName,
			answers.author,
			answers.description
		);
	} catch (e) {
		if (e.message.includes('file already exists')) {
			console.log(e.message);
			process.exit(1);
		}
		console.log(e.message);
		fs.rmdirSync(path.join(CURR_DIR, projectName), {
			recursive: true,
			force: true,
		});
		process.exit(1);
	}

	async.series([
		() => {
			process.chdir(`${CURR_DIR}/${projectName}`);
			exec('yarn install', (error, stdout, stderr) => {
				console.log(stdout || error || stderr);
			});
		},
	]);
};

genos(QUESTIONS);
