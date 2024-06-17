import styled from 'styled-components';

export function ListBody({ children, ...props }) {
	return <StyledList {...props}>{children}</StyledList>;
}

const StyledList = styled.div`
	background-color: ${({ theme }) => theme.color.neutral.surface.strong};
	border-radius: 0 0 ${({ theme }) => theme.radius.medium}
		${({ theme }) => theme.radius.medium};
	border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
`;
