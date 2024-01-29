import {spawn} from 'child_process';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';

const spawnChildProcess = async (args) => {
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const __filename = path.join(__dirname, 'files', 'script.js');

	const childProcess = spawn('node', [__filename, ...args]);

	process.stdin.pipe(childProcess.stdin);
	childProcess.stdout.on('data', (data) => {
		process.stdout.write(data);
	});

	childProcess.on('error', (error) => {
		console.error(error);
	});
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['awdwa', 'awdawd', 23]);
