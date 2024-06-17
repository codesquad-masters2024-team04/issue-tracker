import styled, { keyframes } from 'styled-components';

export function MilestoneIndicator({ milestone, detail }) {
	return (
		<StyledWrapper>
			<span className='total'>
				<StyledProgress className='percentage' $width={milestone?.progress} />
			</span>
			{!detail && <p>{milestone?.name}</p>}
			{detail && (
				<StyledStatus>
					<p className='percent-text'>{milestone?.progress}%</p>
					<p className='open-close'>
						열린 이슈 {milestone?.openIssue} 닫힌 이슈 {milestone?.closeIssue}
					</p>
				</StyledStatus>
			)}
		</StyledWrapper>
	);
}
const AnimationFill = keyframes`
    from {
        width: 0;
    }
    to {
        width: ${({ $width }) => $width}%;
    }
`;

const StyledWrapper = styled.div`
	width: 224px;
	position: relative;

	.total {
		position: relative;
		display: block;
		height: 8px;
		width: 100%;
		background-color: ${({ theme }) => theme.color.neutral.surface.bold};
		border-radius: ${({ theme }) => theme.radius.medium};
		overflow: hidden;
		i {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			background-color: ${({ theme }) => theme.color.palette.blue};
		}
	}
	p {
		margin-top: 8px;
		color: ${({ theme }) => theme.color.neutral.text.strong};
		${({ theme }) => theme.typography.medium[12]}
	}
`;
const StyledProgress = styled.i`
	width: ${({ $width }) => $width}%;
	animation: ${AnimationFill} 1s forwards;
`;
const StyledStatus = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	color: ${({ theme }) => theme.color.neutral.text.weak};
	${({ theme }) => theme.typography.medium[12]}
	p {
		color: inherit;
	}
`;
