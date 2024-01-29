import {parentPort, workerData} from 'worker_threads';

const nthFibonacci = (n) => {
	return n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);
};

const sendResult = () => {
	try {
		parentPort.postMessage(nthFibonacci(workerData));
	} catch (error) {
		parentPort.postMessage(null);
	}
};
sendResult();
