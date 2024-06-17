import { server } from '~/apis/baseApi';

/**
 * @method POST
 */

export async function postComment(issueId, comment) {
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(`${server}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				loginId: 'daniel',
				content: comment,
				issueId: issueId,
			}),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}
