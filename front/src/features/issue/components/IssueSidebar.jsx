import styled from 'styled-components';
import { useState, useRef } from 'react';
import { IconPlus, IconUser } from '~/common/icons';
import { Dropdowns, Label, InputRadio, InputCheck } from '~/common/components';
import { Assignee, MilestoneIndicator } from '~/features/issue/components';

export function IssueSidebar({
	assignees,
	milestones,
	labels,
	selectedAssignees,
	selectedLabels,
	selectedMilestone,
	dispatch,
}) {
	const [isOpen, setIsOpen] = useState({
		assignee: false,
		label: false,
		milestone: false,
	});

	// 셀렉트박스 체크 여부

	const toggleOpen = target =>
		setIsOpen(prev => ({ ...prev, [target]: !prev[target] }));

	const handleAssigneeChange = assignee => {
		dispatch({ type: 'TOGGLE_ASSIGNEE', payload: assignee });
	};

	const handleLabelChange = label => {
		dispatch({ type: 'TOGGLE_LABEL', payload: label });
	};

	const handleMilestoneChange = mile => {
		dispatch({ type: 'SET_MILESTONE', payload: mile });
	};

	return (
		<StyledWrapper>
			<StyledSideItem>
				<StyledTitleWrapper onClick={() => toggleOpen('assignee')}>
					<StyledTitle>담당자</StyledTitle>
					<IconPlus />
				</StyledTitleWrapper>
				{isOpen.assignee && (
					<StyledDropdown dropdownTitle='담당자 설정'>
						{assignees.map((assignee, index) => (
							<InputCheck
								key={index}
								listName={'assignees'}
								value={assignee.loginId}
								src={assignee.profileImage}
								checked={selectedAssignees.includes(assignee.loginId)}
								onChange={() => handleAssigneeChange(assignee.loginId)}
							/>
						))}
					</StyledDropdown>
				)}
				<StyledSideContent>
					{selectedAssignees.map((assigneeId, index) => {
						const assignee = assignees.find(a => a.loginId === assigneeId);
						return <Assignee key={index} assignee={assignee} />;
					})}
				</StyledSideContent>
			</StyledSideItem>
			<StyledSideItem>
				<StyledTitleWrapper onClick={() => toggleOpen('label')}>
					<StyledTitle>레이블</StyledTitle>
					<IconPlus />
				</StyledTitleWrapper>
				{isOpen.label && (
					<StyledDropdown dropdownTitle='레이블 설정'>
						{labels.map((label, index) => (
							<InputCheck
								key={index}
								listName={'label'}
								value={label.name}
								checked={selectedLabels.includes(label.name)}
								bgColor={label.backgroundColor}
								fontColor={label.textColor}
								onChange={() => handleLabelChange(label.name)}
							/>
						))}
					</StyledDropdown>
				)}
				<StyledSideContent>
					{selectedLabels &&
						selectedLabels.map((labelName, index) => {
							const label = labels.find(l => l.name === labelName);
							return (
								<Label
									key={index}
									name={label.name}
									backgroundColor={label.backgroundColor}
									textColor={label.textColor}
								/>
							);
						})}
				</StyledSideContent>
			</StyledSideItem>
			<StyledSideItem>
				<StyledTitleWrapper onClick={() => toggleOpen('milestone')}>
					<StyledTitle>마일스톤</StyledTitle>
					<IconPlus />
				</StyledTitleWrapper>
				{isOpen.milestone && (
					<StyledDropdown dropdownTitle='마일스톤 설정'>
						{milestones.map((mile, index) => (
							<InputRadio
								key={index}
								listName={'milestone'}
								value={mile.name}
								checked={selectedMilestone?.id === mile.id}
								onChange={() => handleMilestoneChange(mile)}
							/>
						))}
					</StyledDropdown>
				)}
				<StyledSideContent>
					{selectedMilestone && (
						<MilestoneIndicator milestone={selectedMilestone} />
					)}
				</StyledSideContent>
			</StyledSideItem>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	width: 288px;
	border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	border-radius: ${({ theme }) => theme.radius.large};
	background: ${({ theme }) => theme.color.neutral.surface.strong};
`;
const StyledSideItem = styled.div`
	position: relative;
	padding: 32px;
	min-height: 88px;
	align-items: flex-start;
	border-bottom: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	&:last-child {
		border-bottom: none;
	}
`;
const StyledDropdown = styled(Dropdowns)`
	top: 70px;
	right: 0;
`;

const StyledTitleWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	cursor: pointer;
`;
const StyledTitle = styled.h4`
	${({ theme }) => theme.typography.medium[16]};
	color: ${({ theme }) => theme.color.neutral.text.default};
`;
const StyledSideContent = styled.div`
	margin-top: 16px;
	.label {
		margin-bottom: 8px;
		&:last-child {
			margin-right: 0;
		}
	}
`;
