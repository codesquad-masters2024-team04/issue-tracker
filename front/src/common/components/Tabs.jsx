import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconLabel, IconMilestone } from '~/common/icons';

import { useLabelMilestoneCounter } from '~/context/hooks';

export const Tabs = ({ ...props }) => {
	const { labelCounter = 0, milestoneCounter = 0 } = useLabelMilestoneCounter();

	return (
		<StyledWrapper {...props}>
			<Link to='/labels'>
				<IconLabel />
				레이블 ({labelCounter})
			</Link>
			<Link to='/milestones'>
				<IconMilestone />
				마일스톤 ({milestoneCounter})
			</Link>
		</StyledWrapper>
	);
};
const StyledWrapper = styled.div`
	display: flex;
	width: 320px;
	height: 40px;
	border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	border-radius: ${({ theme }) => theme.radius.medium};
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 159.5px;
		height: 40px;
		column-gap: 4px;
		color: ${({ theme }) => theme.color.neutral.text.default};
		${({ theme }) => theme.typography.medium[14]};
		background-color: 
		&:first-child {
			border-right: 1px solid
				${({ theme }) => theme.color.neutral.border.default};
		}
	}
`;
