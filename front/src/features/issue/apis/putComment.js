import { server } from '~/apis/baseApi';

export async function putComment(commentId, comment) {
	try {
		const token = localStorage.getItem('token');
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ content: comment }),
		};
		const response = await fetch(
			`${server}/comments/${commentId}`,
			requestOptions
		);
		if (response.status === 200) {
			return { success: true };
		} else {
			console.error('Error:', response);
			return { error: response.statusText };
		}
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}
