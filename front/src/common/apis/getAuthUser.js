import { server } from '~/apis/baseApi';

// 유저 정보 조회 API
export async function getAuthUser() {
	try {
		const token = localStorage.getItem('token');
		const requestOptions = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await fetch(`${server}/users/login`, requestOptions);
		return response.json();
	} catch (error) {
		console.error(error);
		throw new Error('유저 정보 조회에 실패했습니다.');
	}
}
