import { server } from '~/apis/baseApi';
import { message } from 'antd';
export async function addLabel(label) {
	try {
		const token = localStorage.getItem('token');
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(label),
		};
		const response = await fetch(`${server}/labels`, requestOptions);
		if (response.status === 201) {
			return { success: true };
		}
	} catch (error) {
		console.error('Error:', error);
		return { error: error.message };
	}
}

export async function deleteLabel(lableId, labelName) {
	const token = localStorage.getItem('token');
	try {
		const requestOptions = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await fetch(`${server}/labels/${lableId}`, requestOptions);
		if (response.status === 204) {
			message.success(`${labelName} 라벨이 삭제 되었어요!`);
			return;
		} else {
			message.error(`${labelName} 라벨 삭제에 실패했어요!`);
			console.error('Error:', response);
		}
	} catch (error) {
		console.error('Error:', error);
	}
}
