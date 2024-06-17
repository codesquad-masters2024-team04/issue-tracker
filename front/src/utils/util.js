/**
 * @ param {string} 2024-05-14T06:07:15.160190262
 * @ return {string} 3분전 / 1 시간 15분전
 */

function timestamp(createTime) {
	const currentTime = new Date();
	const targetTime = new Date(createTime);
	const diff = currentTime - targetTime;
	const diffSeconds = Math.floor(diff / 1000);
	const diffMinutes = Math.floor(diff / 1000 / 60);
	const diffHours = Math.floor(diff / 1000 / 60 / 60);

	return diffHours > 0
		? `${diffHours}시간 전`
		: diffMinutes > 0
		? `${diffMinutes}분 전`
		: `${diffSeconds}초 전`;
}

function colorGenerator() {
	const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
	return color;
}

/**
 * @ param {array} [1, 2, 3, 10, 20] 10, 20
 * @ param {number} 10
 * @ return {array} [1, 2, 3, 20]
 */
function checkItemArray(array, value) {
	const exists = array.includes(value);
	if (exists) {
		return array.filter(item => item !== value);
	} else {
		return [...array, value];
	}
}

// ! Refactor

export function toggleItemInArray(array, item, key) {
	if (!array || !item || !key) return;

	return array.some(arrayItem => arrayItem[key] === item[key])
		? array.filter(arrayItem => arrayItem[key] !== item[key])
		: [...array, item];
}

export { timestamp, colorGenerator, checkItemArray };
