import styled from 'styled-components';
import { Input } from 'antd';

export function InputTitleEdit({
	type = 'text',
	placeholder,
	value,
	onChange,
}) {
	return (
		<StyledWrapper>
			<Input
				type={type}
				onChange={onChange}
				placeholder={placeholder}
				value={value}
			/>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	width: 100%;
	height: 40px;

	background: ${({ theme }) => theme.color.neutral.surface.strong};
	input {
		width: 100%;
		color: ${({ theme }) => theme.color.neutral.text.default};
		height: 100%;
		${({ theme }) => theme.typography.medium[16]};
	}
`;
