import styled from 'styled-components';

export function ListHeader({ children, ...props }) {
	return <StyledListHeader {...props}>{children}</StyledListHeader>;
}

const StyledListHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 64px;
	padding: 0 32px;
	background-color: ${({ theme }) => theme.color.neutral.surface.default};
	border-radius: 16px 16px 0 0;
	border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	border-bottom: none;
`;
