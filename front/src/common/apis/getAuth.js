import { server } from '~/apis/baseApi';

export async function getAuth() {
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(`${server}/users/login`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then(res => res.json());
		const data = response;
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('이슈 목록 조회에 실패했습니다.');
	}
}
