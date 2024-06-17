import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconPlus, IconAlertCircle, IconArchive } from '~/common/icons';
import { LabelMilestoneCounterProvider } from '~/context/LabelMilestoneCounter';
import { Tabs, ListHeader, ListBody, Button } from '~/common/components';
import { MileRegister, MileListItem } from '~/features/milestone/components';
import { useMilestoneList } from '~/features/issue/hooks';

export function MilestoneContainer() {
	const { milestoneList, fetchMilestoneList } = useMilestoneList();
	const [newMilestone, setNewMilestone] = useState(false);
	const statusCount = milestoneList.reduce(
		(acc, milestone) => {
			if (!milestone.closed) {
				acc.open += 1;
			} else {
				acc.closed += 1;
			}
			return acc;
		},
		{ open: 0, closed: 0 }
	);

	return (
		<>
			<StyledWrapper>
				<div className='container-header'>
					<LabelMilestoneCounterProvider>
						<Tabs />
					</LabelMilestoneCounterProvider>

					<Button
						type='button'
						size='small'
						buttonText='마일스톤 추가'
						icon={<IconPlus />}
						disabled={newMilestone}
						onClick={() => {
							setNewMilestone(true);
						}}
					/>
				</div>
				{newMilestone && (
					<MileRegister
						setNewMilestone={setNewMilestone}
						newMilestone={newMilestone}
						fetchMilestoneList={fetchMilestoneList}
					/>
				)}

				<StyledListHeader>
					<strong>
						<IconAlertCircle />
						열린 마일스톤({statusCount.open})
					</strong>
					<strong>
						<IconArchive />
						닫힌 마일스톤({statusCount.closed})
					</strong>
				</StyledListHeader>
				<ListBody>
					{milestoneList.map(milestone => (
						<MileListItem
							key={milestone.id}
							milestone={milestone}
							fetchMilestoneList={fetchMilestoneList}
						/>
					))}
				</ListBody>
			</StyledWrapper>
		</>
	);
}
const StyledWrapper = styled.div`
	.container-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24px;
	}
`;
const StyledListHeader = styled(ListHeader)`
	display: flex;
	align-items: center;
	gap: 24px;
	justify-content: flex-start;
	strong {
		display: flex;
		align-items: center;
		gap: 4px;
	}
`;
