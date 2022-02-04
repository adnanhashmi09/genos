const fs = require('fs');
const path = require('path');

// const CURR_DIR = process.cwd();

module.exports.createDirectoryContents = (
	templatePath,
	projectPath,
	destination,
	author,
	description
) => {
	const filesToCreate = fs.readdirSync(templatePath);

	filesToCreate.forEach((file) => {
		const ogFilePath = path.join(templatePath, file);
		const stats = fs.statSync(ogFilePath);

		if (stats.isFile()) {
			let content = fs.readFileSync(ogFilePath, 'utf8');
			let filename = `${file}`;

			// rename fallback for npmignore
			if (filename === '.npmignore') filename = '.gitignore';

			if (/^package\.json$/.test(filename)) {
				content = JSON.parse(content);
				content.name = projectPath;
				content.author = author;
				content.description = description;
				content = JSON.stringify(content, null, 3);
			}

			const writePath = path.join(destination, projectPath, filename);
			fs.writeFileSync(writePath, content, 'utf8');
		}

		if (stats.isDirectory()) {
			fs.mkdirSync(path.join(destination, projectPath, file));

			// recursive call to the function
			this.createDirectoryContents(
				path.join(templatePath, file),
				path.join(projectPath, file),
				destination,
				author,
				description
			);
		}
	});
};
