import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InputTextArea, ImageUpload } from '~/common/components';

export function IssueCommentEdit({
	className,
	value,
	placeholder,
	onChange, // 필요에 따라 추가
	onClick,
}) {
	const [localValue, setLocalValue] = useState(value || '');
	const [bg, setBg] = useState(false);
	const [fileUrls, setFileUrls] = useState([]);

	const handleUploadSuccess = url => {
		const fileURLValue = `![이미지](${url})`;
		setFileUrls(prevUrls => [...prevUrls, fileURLValue]);
		setLocalValue(prevValue => `${prevValue}\n${fileURLValue}`);
	};

	const handleChange = e => {
		const newValue = e.target.value;
		setLocalValue(newValue);
		if (onChange) onChange(e); // 필요에 따라 부모 컴포넌트로 변경 사항 전달
	};

	useEffect(() => {
		if (value !== undefined) {
			setLocalValue(value);
		}
	}, [value]);

	// localValue가 변경될 때 fileUrls 배열 동기화
	useEffect(() => {
		const newFileUrls = fileUrls.filter(url => localValue.includes(url));
		if (newFileUrls.length !== fileUrls.length) {
			setFileUrls(newFileUrls);
		}
	}, [localValue, fileUrls]);

	return (
		<StyledWrapper $bg={bg} className={className}>
			<InputTextArea
				value={localValue}
				placeholder={placeholder}
				onChange={handleChange}
				onClick={onClick}
				onFocus={() => setBg(true)}
				onBlur={() => setBg(false)}
			/>
			<ImageUpload handleUploadSuccess={handleUploadSuccess} />
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
	height: 100%;
	background-color: ${({ theme, $bg }) =>
		$bg
			? theme.color.neutral.surface.strong
			: theme.color.neutral.surface.bold};
	border: 1px solid transparent;
	border-color: ${({ theme, $bg }) =>
		$bg ? theme.color.neutral.border.active : 'transparent'};
	overflow: hidden;
	border-radius: ${({ theme }) => theme.radius.large};
	textarea {
		height: 100%;
		max-height: 100%;
		background-color: ${({ theme }) => theme.color.neutral.surface.bold};
		&:hover {
			background-color: ${({ theme }) => theme.color.neutral.surface.bold};
		}
		&:focus {
			background-color: ${({ theme }) => theme.color.neutral.surface.strong};
		}
	}
`;
