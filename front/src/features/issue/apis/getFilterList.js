import { server } from '~/apis/baseApi';

/**
 * 라벨 목록을 조회하는 API
 * @url http://3.38.30.88:8080/labels
 * @returns {object} : 라벨 리스트 정보
 */

async function getLabels() {
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(`${server}/labels`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then(res => res.json());
		const data = response;
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('레이블 목록 조회에 실패했습니다.');
	}
}

async function getMilestones() {
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(`${server}/milestones`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then(res => res.json());
		const data = response;
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('마일스톤 목록 조회에 실패했습니다.');
	}
}

export { getLabels, getMilestones };
