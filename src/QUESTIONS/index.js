const fs = require('fs');
const path = require('path');

const choices = fs.readdirSync(path.join(__dirname, '..', '..', 'templates')); // Directory of templates

module.exports.QUESTIONS = [
	{
		name: 'project-choice',
		type: 'list',
		message: 'What project template would you like to generate?',
		choices,
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
];
