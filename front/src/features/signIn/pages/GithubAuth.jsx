import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function GithubAuth() {
	const navigate = useNavigate();

	useEffect(() => {
		async function handleCallback() {
			const params = new URLSearchParams(window.location.search);
			const token = params.get('token');

			if (token) {
				localStorage.setItem('token', token);
				navigate('/issues');
			} else {
				console.error('Token not found in URL parameters.');
			}
		}

		handleCallback();
	}, [navigate]);

	return <div>Loading...</div>;
}
