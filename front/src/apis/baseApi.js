export const server =
	import.meta.env.MODE === 'production'
		? 'http://3.38.30.88:8080'
		: 'http://3.38.30.88:8080';
export const devServer = 'http://localhost:8080';
