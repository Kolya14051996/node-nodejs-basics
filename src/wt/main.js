import {Worker, workerData} from 'worker_threads';
import os from 'os';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import {error} from 'console';

const performCalculations = async () => {
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const __filename = path.join(__dirname, 'worker.js');
	const totalCores = os.cpus().length;
	const results = [];

	for (let i = 0; i < totalCores; i++) {
		await new Promise((res, rej) => {
			const worker = new Worker(__filename, {workerData: 10 + i});

			worker.on('message', (msg) => {
				results.push({status: 'resolved', data: msg});
				res();
			});

			worker.on('error', (error) => {
				results.push({status: 'error', data: null});
				rej(error);
			});
		}).catch((err) => {
			console.error(err);
		});
	}

	console.log(results);
};

await performCalculations();
