import { server } from '~/apis/baseApi';

export async function putLabel(labelId, label) {
	const token = localStorage.getItem('token');
	try {
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(label),
		};
		const response = await fetch(`${server}/labels/${labelId}`, requestOptions);
		if (response.status === 204) {
			return { success: true };
		}
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}
