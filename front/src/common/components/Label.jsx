import styled from 'styled-components';

export function Label({ textColor, name, backgroundColor }) {
	return (
		<StyledWrapper
			$backgroundColor={backgroundColor}
			$textColor={textColor}
			className='label'
		>
			{name}
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	display: inline-block;
	padding: 4px 12px;
	border-radius: ${({ theme }) => theme.radius.large};
	background: ${({ $backgroundColor }) => $backgroundColor};
	flex-shrink: 0;
	color: ${({ $textColor }) => $textColor};

	${({ theme }) => theme.typography.medium[12]};
	& + .label {
		margin-left: 8px;
	}
`;
