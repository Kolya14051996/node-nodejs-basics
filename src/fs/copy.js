import {promises as fs, constants} from 'node:fs';
import * as path from 'path';
import { dirname } from 'node:path';
import {fileURLToPath} from 'url';

const copy = async () => {
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const sourceFileName = path.join(__dirname, 'files');
	const destinationFileName = path.join(__dirname, 'files_copy');



	try {
		await fs.access(destinationFileName, constants.R_OK);

		throw new Error('FS operation failed');
	} catch (error) {
		if (error.code === 'ENOENT') {
			try {
				await fs.mkdir(destinationFileName, {recursive: true});

				const files = await fs.readdir(sourceFileName);
				for (const file of files) {
					const sourceFile = path.join(sourceFileName, file);
					const destinationFile = path.join(destinationFileName, file);

					await fs.copyFile(sourceFile, destinationFile);
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			console.error(error.message);
		}
	}
};

await copy();
