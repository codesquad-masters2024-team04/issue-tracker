import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
const { TextArea } = Input;

export function InputTextArea({
	className,
	placeholder = '코멘트를 입력해 주세요✍🏻',
	value,
	onChange,
	onClick,
	onFocus,
	onBlur,
}) {
	const [localValue, setLocalValue] = useState(value);

	// value prop이 변경될 때 localValue 업데이트
	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	return (
		<StyledWrapper className={className}>
			<StyledTextArea
				placeholder={placeholder}
				value={localValue}
				onChange={e => {
					setLocalValue(e.target.value);
					onChange(e); // 부모 컴포넌트의 onChange 호출
				}}
				onClick={onClick}
				onBlur={() => {
					onBlur();
				}}
				onFocus={() => {
					onFocus();
				}}
			/>
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
	position: relative;
	min-height: 132px;
	height: 100%;
	max-height: 500px;
	.ant-input-outlined:focus-within {
		box-shadow: none;
	}
	.ant-input-show-count {
		${({ theme }) => theme.typography.medium[12]};
		color: ${({ theme }) => theme.color.neutral.text.weak};
	}
	i {
		position: absolute;
		right: 44px;
		bottom: 16px;
		${({ theme }) => theme.typography.medium[12]};
		color: ${({ theme }) => theme.color.neutral.text.weak};
		font-style: normal;
	}
`;

const StyledTextArea = styled(TextArea)`
	height: 132px;
	border: none;
	&&& {
		border-color: transparent;
	}
	&&&:hover {
		border-color: transparent;
	}
	&&&:focus,
	&&&:active {
		border-color: transparent;
		box-shadow: none;
	}
`;
