import styled from 'styled-components';

export function Assignee({ assignee }) {
	return (
		<StyledWrapper>
			<img src={assignee?.profileImage} alt={assignee?.loginId} />
			<span>{assignee?.loginId}</span>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	display: flex;
	align-items: center;
	column-gap: 8px;
	height: 20px;
	img {
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}
	span {
		color: ${({ theme }) => theme.color.neutral.text.strong};
		${({ theme }) => theme.typography.medium[12]}
	}
	& + div {
		margin-top: 16px;
	}
`;
