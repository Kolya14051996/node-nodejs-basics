const parseEnv = () => {
	const prefix = 'RSS_';

	const variables = Object.entries(process.env);
	const result = variables
		.filter(([key]) => key.startsWith(prefix))
		.map(([key, value]) => `${key}=${value}`);
		

	console.log(result.join('; '));
};

parseEnv();
