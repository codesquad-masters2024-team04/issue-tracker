import styled from 'styled-components';

export function Empty({ text, ...props }) {
	return <StyledWrapper {...props}>{text}</StyledWrapper>;
}
const StyledWrapper = styled.div`
	padding: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	${({ theme }) => theme.typography.medium[16]}
	color: ${({ theme }) => theme.color.neutral.text.weak};
	background: ${({ theme }) => theme.color.neutral.surface.strong};
`;
