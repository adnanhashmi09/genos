/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const choices = fs.readdirSync(path.join(__dirname, '..', '..', 'templates')); // Directory of templates

module.exports.QUESTIONS = [
	{
		name: 'project-choice',
		type: 'list',
		message: 'What project template would you like to generate?',
		choices: ['Front-End', 'Express Server', 'Blockchain'],
	},
	{
		name: 'detail-1',
		type: 'list',
		message: 'Framework/Library',
		choices: ['Nextjs'],
		when: (answers) => {
			const regex =
				/Front-End|Fullstack App with node server|Fullstack Dapp/;
			return regex.test(answers['project-choice']);
		},
	},
	{
		name: 'detail-2',
		type: 'list',
		message: 'Choose between Javascript and Typescript',
		choices: ['Javascript', 'Typescript'],
		when: (answers) => {
			const regex =
				/Front-End|Fullstack App with node server|Fullstack Dapp/;
			return regex.test(answers['project-choice']);
		},
	},
	{
		name: 'detail-3',
		type: 'list',
		message: 'Choose between SCSS and CSS',
		choices: ['SCSS', 'CSS'],
		when: (answers) => {
			const regex =
				/Front-End|Fullstack App with node server|Fullstack Dapp/;
			return regex.test(answers['project-choice']);
		},
	},
	{
		name: 'project-name',
		type: 'input',
		message: 'Project name: ',
		validate(input) {
			if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
			return 'Project name may only include letters, numbers, underscores and hashes.';
		},
	},
	{
		name: 'author',
		type: 'input',
		message: "Author's name: ",
		validate(input) {
			if (/^(\w)+$/.test(input)) return true;
			return "Author's name may only include letters, numbers and underscores ";
		},
		default: '',
	},
	{
		name: 'description',
		type: 'input',
		message: 'Project description: ',
		default: '',
	},
	{
		type: 'directory',
		name: 'destination',
		message: `Where you like to create your starter files? \n \n${chalk.bgRed(
			'Note:'
		)} This will create a Directory inside the selected destination.\n \n`,
		basePath: './',
		options: {
			displayFiles: false,
			displayHidden: false,
		},
	},
];
