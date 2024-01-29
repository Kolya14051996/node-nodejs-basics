import * as path from 'path';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import zlib from 'node:zlib';

import fs from 'fs';

const compress = async () => {
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const oldFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
	const compressedFilePath = path.join(path.dirname(oldFilePath), 'archive.gz');

	const readStream = fs.createReadStream(oldFilePath);
	const writeStream = fs.createWriteStream(compressedFilePath);

	readStream.pipe(zlib.createGzip().pipe(writeStream));

	writeStream.on('finish', () => {
		fs.unlink(oldFilePath);
	});
};

await compress();

	// 	const writeStream = fs.createWriteStream(unCompressedFilePath);

	//     readStream.pipe(zlib.createGunzip()).pipe(writeStream);

	// 	writeStream.on('finish', () => {
	// 		// fs.unlink(oldFilePath, (error) => {
	// 		// 	if (error) {
	// 		// 		console.log('oshibka :', error);
	// 		// 	} else {
	// 		// 		console.log('net osihbok');
	// 		// 	}
	// 		// });
	// 	});
	// 	writeStream.on('error', (error) => {
	// 		console.error(`Ошибка при записи файла: ${error.message}`);
	// 	});

	// 	// Обработчик события error для потока распаковки
	// 	zlib.createGunzip().on('error', (error) => {
	// 		console.error(`Ошибка при распаковке файла: ${error.message}`);
	// 	});
	// 	readStream.on('error', (error) => {
	// 		console.error(`Ошибка при чтении файла: ${error.message}`);
	// 	});

	// 	zlib.createGunzip().on('error', (error) => {
	// 		console.error(`Ошибка при распаковке файла: ${error.message}`);
	// 	});
	// };
