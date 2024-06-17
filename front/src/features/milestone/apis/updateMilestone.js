import { server } from '~/apis/baseApi';

export async function postMilestone(milestone) {
	try {
		const token = localStorage.getItem('token');
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(milestone),
		};
		const response = await fetch(`${server}/milestones`, requestOptions);
		if (response.status === 201) {
			return { success: true };
		}
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}

export async function putMilestone(milestoneId, milestone) {
	try {
		const token = localStorage.getItem('token');
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(milestone),
		};
		const response = await fetch(
			`${server}/milestones/${milestoneId}`,
			requestOptions
		);
		if (response.status === 200) {
			return { success: true };
		}
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}

export async function deleteMilestone(milestoneId) {
	try {
		const token = localStorage.getItem('token');
		const requestOptions = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await fetch(
			`${server}/milestones/${milestoneId}`,
			requestOptions
		);
		if (response.status === 204) {
			return { success: true };
		}
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}
