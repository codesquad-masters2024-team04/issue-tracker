import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
	IconEdit,
	IconTrash,
	IconArchive,
	IconMilestone,
	IconCalendar,
} from '~/common/icons';
import { Button } from '~/common/components';
import { MilestoneIndicator } from '~/features/issue/components';
import { MileRegister } from '~/features/milestone/components';
import { deleteMilestone } from '~/features/milestone/apis';

export function MileListItem({ milestone, fetchMilestoneList }) {
	const [isEdit, setIsEdit] = useState(false);

	const handleDeleteMilestone = async () => {
		try {
			await deleteMilestone(milestone.id);
			await fetchMilestoneList();
		} catch (error) {
			console.error('Error:', error);
			alert('마일스톤 삭제에 실패했습니다.');
		}
	};
	return (
		<StyledListItem>
			{isEdit ? (
				<MileRegister
					isEdit={isEdit}
					setIsEdit={setIsEdit}
					milestone={milestone}
					fetchMilestoneList={fetchMilestoneList}
				/>
			) : (
				<>
					<StyledMileInfo>
						<p className='title'>
							<StyledIconMilestone />
							<strong>{milestone.name}</strong>
							<span className='due'>
								<IconCalendar />
								<span>{milestone.dueDate}</span>
							</span>
						</p>
						{milestone.description && (
							<p className='description'>{milestone.description}</p>
						)}
					</StyledMileInfo>
					<StyledOptions>
						<div className='button-list'>
							<Button
								type='button'
								buttonType='ghost'
								size='small'
								buttonText='닫기'
								icon={<IconArchive />}
								onClick={() => setIsEdit(true)}
							/>
							<Button
								type='button'
								buttonType='ghost'
								size='small'
								buttonText='편집'
								icon={<IconEdit />}
								onClick={() => setIsEdit(true)}
							/>
							<Button
								type='button'
								buttonType='ghost'
								size='small'
								buttonText='삭제'
								icon={<IconTrash />}
								onClick={handleDeleteMilestone}
							/>
						</div>
						<div className='milestone-info'>
							<MilestoneIndicator
								milestone={{
									progress: milestone.progress,
									name: milestone.name,
									openIssue: milestone.openIssue || '',
									closeIssue: milestone.closeIssue || '',
								}}
								detail={true}
							/>
						</div>
					</StyledOptions>
				</>
			)}
		</StyledListItem>
	);
}
const StyledListItem = styled.div`
	padding: 32px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	column-gap: 32px;
	border-bottom: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	&:last-child {
		border-bottom: none;
	}
	.button-list {
		display: flex;
		column-gap: 24px;
		button {
			min-width: auto;
			width: 41px;
			padding: 8px 0;
			column-gap: 4px;
			&:last-child {
				color: ${({ theme }) => theme.color.danger.text.default};
			}
		}
	}
`;

const StyledMileInfo = styled.div`
	display: flex;
	flex-direction: column;
	.title {
		display: flex;
		align-items: center;
		gap: 8px;
		${({ theme }) => theme.typography.medium[16]};
		strong {
			color: ${({ theme }) => theme.color.neutral.text.strong};
		}
		.due {
			display: flex;
			align-items: center;
			gap: 8px;
			margin-left: 8px;
			color: ${({ theme }) => theme.color.neutral.text.weak};
			${({ theme }) => theme.typography.medium[12]};
		}
	}
	.description {
		margin-top: 8px;
		color: ${({ theme }) => theme.color.neutral.text.weak};
	}
`;
const StyledOptions = styled.div`
	display: flex;
	flex-direction: column;
`;
const StyledIconMilestone = styled(IconMilestone)`
	color: ${({ theme }) => theme.color.palette.blue};
`;
