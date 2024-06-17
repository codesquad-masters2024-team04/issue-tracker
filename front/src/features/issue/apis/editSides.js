import { server } from '~/apis/baseApi';
/**
 *
 * @ param {number} issueId
 * @ param {string[]} loginIdArray
 *  ex) ["test1@example.com", "test2@example.com"] assignee의 loginId
 */
export async function addAssignee(issueId, loginIdArray) {
	console.log('issueId', issueId);
	try {
		const token = localStorage.getItem('token');
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(loginIdArray),
		};
		const response = await fetch(
			`${server}/issues/${issueId}/assignee`,
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

export async function deleteAssignee(issueId, loginIdArray) {
	try {
		const token = localStorage.getItem('token');
		const requestOptions = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(loginIdArray),
		};
		const response = await fetch(
			`${server}/issues/${issueId}/assignee`,
			requestOptions
		);
		if (response.status === 204) {
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

// 라벨 추가
export async function addLabel(issueId, labelIdArray) {
	try {
		const token = localStorage.getItem('token');
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(labelIdArray),
		};
		const response = await fetch(
			`${server}/issues/${issueId}/label`,
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
// 라벨 삭제
export async function deleteLabel(issueId, labelIdArray) {
	try {
		const token = localStorage.getItem('token');
		const requestOptions = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(labelIdArray),
		};
		const response = await fetch(
			`${server}/issues/${issueId}/label`,
			requestOptions
		);
		if (response.status === 204) {
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
