import * as path from 'path';
import fs from 'fs';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import zlib from 'node:zlib';

const decompress = async () => {
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const oldFilePath = path.join(__dirname, 'files', 'archive.gz');
	const unCompressedFilePath = path.join(
		path.dirname(oldFilePath),
		'fileToCompress.txt'
	);
	
    return new Promise((resolve, reject) => {
        const gunzip = zlib.createGunzip();
        const readStream = fs.createReadStream(oldFilePath);
        const writeStream = fs.createWriteStream(unCompressedFilePath); // Опционально: можно записать распакованные данные в файл

        // Перенаправляем поток чтения через поток распаковки
        readStream.pipe(gunzip)
            .on('error', (error) => {
                reject(error);
            })
            .pipe(writeStream); // Опционально: можно записать распакованные данные в файл

        // Собираем распакованные данные в строку
        let data = '';
        gunzip.on('data', (chunk) => {
            data += chunk.toString();
        });

        // Обрабатываем завершение потока
        gunzip.on('end', () => {
            resolve(data);
        });
    });
};
await decompress();
