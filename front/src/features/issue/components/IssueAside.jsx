import React, { useReducer, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IconPlus } from '~/common/icons';
import { Label } from '~/common/components';

import {
	PopoverAssignee,
	Assignee,
	PopoverLabel,
	MilestoneIndicator,
	PopoverMilestone,
} from '~/features/issue/components';
import { useCheck } from '../context/CheckProvider';

function listArrayReducer(state, action) {
	switch (action.type) {
		case 'UPDATE':
			return action.payload;
		default:
			throw new Error();
	}
}

function lableArrayReducer(state, action) {
	switch (action.type) {
		case 'UPDATE':
			return action.payload;
		default:
			throw new Error();
	}
}

export function IssueAside({
	issueId,
	list,
	labels,
	miles,
	onAddAssignee,
	onDeleteAssignee,
	onAddLabel,
	onDeleteLabel,
	...props
}) {
	const { check, checkDispatch } = useCheck();
	const listArray = useRef(list ? [...list] : []);
	const lableArray = useRef(labels ? [...labels] : []);
	const mileTarget = useRef(miles || null);

	const [, forceUpdate] = useReducer(listArrayReducer, []);
	const [, forceUpdateLabel] = useReducer(lableArrayReducer, []);

	const [isOpen, setIsOpen] = useState({
		assignee: false,
		label: false,
		milestone: false,
	});
	const [mile, setMile] = useState(miles);

	const toggleOpen = target =>
		setIsOpen(prev => ({ ...prev, [target]: !prev[target] }));

	useEffect(() => {
		listArray.current = list ? [...list] : [];
		forceUpdate({ type: 'UPDATE', payload: listArray.current });
	}, [list]);

	useEffect(() => {
		lableArray.current = labels ? [...labels] : [];
		forceUpdateLabel({ type: 'UPDATE', payload: lableArray.current });
	}, [labels]);

	const onChangeAssignee = e => {
		const { value, dataset, checked } = e.target;
		const newAssignee = {
			loginId: value,
			profileImage: dataset.src,
		};

		if (checked) {
			listArray.current = [...listArray.current, newAssignee];
		} else {
			listArray.current = listArray.current.filter(
				assignee => assignee.loginId !== value
			);
		}

		forceUpdate({ type: 'UPDATE', payload: listArray.current });

		checkDispatch({
			type: 'setAssignees',
			payload: newAssignee,
		});
	};

	const onChangeLabel = e => {
		const { id, value, dataset, checked } = e.target;
		const newLabel = {
			id,
			name: value,
			backgroundColor: dataset.bgcolor,
			textColor: dataset.textcolor,
		};

		if (checked) {
			lableArray.current = [...lableArray.current, newLabel];
		} else {
			lableArray.current = lableArray.current.filter(
				label => label.name !== newLabel.name
			);
		}

		forceUpdateLabel({ type: 'UPDATE', payload: lableArray.current });

		checkDispatch({
			type: 'setLabels',
			payload: newLabel,
		});
	};

	useEffect(() => {
		if (list && listArray.current) {
			const addedAssignees = listArray.current.filter(
				assignee => !list.some(item => item.loginId === assignee.loginId)
			);
			const removedAssignees = list.filter(
				assignee =>
					!listArray.current.some(item => item.loginId === assignee.loginId)
			);

			if (addedAssignees.length > 0) {
				onAddAssignee(
					issueId,
					addedAssignees.map(assignee => assignee.loginId)
				);
			}
			if (removedAssignees.length > 0) {
				onDeleteAssignee(
					issueId,
					removedAssignees.map(assignee => assignee.loginId)
				);
			}
		}
	}, [list, listArray.current]);

	useEffect(() => {
		if (labels && lableArray.current) {
			const addedLabels = lableArray.current.filter(
				label => !labels.some(item => item.name === label.name)
			);
			const removedLabels = labels.filter(
				label => !lableArray.current.some(item => item.name === label.name)
			);

			if (addedLabels.length > 0) {
				onAddLabel(
					issueId,
					addedLabels.map(label => label.id)
				);
			}
			if (removedLabels.length > 0) {
				onDeleteLabel(
					issueId,
					removedLabels.map(label => label.id)
				);
			}
		}
	}, [labels, lableArray.current]);

	return (
		<StyledWrapper {...props}>
			<StyledSideItem>
				<StyledTitleWrapper onClick={() => toggleOpen('assignee')}>
					<StyledTitle>담당자</StyledTitle>
					<IconPlus />
					{isOpen.assignee && (
						<PopoverAssignee
							dropdownTitle='담당자 설정'
							type='checkbox'
							onChange={onChangeAssignee}
							checkedItems={listArray.current.map(assignee => assignee.loginId)}
						/>
					)}
				</StyledTitleWrapper>
				<StyledContent>
					{listArray.current.map((assignee, index) => (
						<Assignee key={index} assignee={assignee} />
					))}
				</StyledContent>
			</StyledSideItem>

			<StyledSideItem>
				<StyledTitleWrapper onClick={() => toggleOpen('label')}>
					<StyledTitle>레이블</StyledTitle>
					<IconPlus />
					{isOpen.label && (
						<PopoverLabel
							dropdownTitle='레이블 설정'
							type='checkbox'
							onChange={onChangeLabel}
							checkedItems={lableArray.current.map(label => label.name)}
						/>
					)}
				</StyledTitleWrapper>
				<StyledContent>
					{lableArray.current.map((label, index) => (
						<Label
							key={index}
							name={label.name}
							backgroundColor={label.backgroundColor}
							textColor={label.textColor}
						/>
					))}
				</StyledContent>
			</StyledSideItem>

			{/* 마일스톤 */}
			<StyledSideItem>
				<StyledTitleWrapper>
					<StyledTitle>마일스톤</StyledTitle>
					{/* <IconPlus onClick={() => toggleOpen('milestone')} />
					{isOpen.milestone && (
						<PopoverMilestone
							dropdownTitle='마일스톤 설정'
							type='radio'
							onChange={e => {
								const { value, id, checked } = e.target;
								if (checked) {
									setMile(miles);
								} else {
									setMile(value);
									console.log(mile);
								}
							}}
							checkedItems={miles}
						/>
					)} */}
				</StyledTitleWrapper>
				<StyledContent>
					{miles && <MilestoneIndicator milestone={miles} />}
				</StyledContent>
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
	padding: 32px;
	align-items: flex-start;
	border-bottom: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	&:last-child {
		border-bottom: none;
	}
`;

const StyledTitleWrapper = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	justify-content: space-between;
	cursor: pointer;
`;
const StyledTitle = styled.h4`
	${({ theme }) => theme.typography.medium[16]};
	color: ${({ theme }) => theme.color.neutral.text.default};
`;
const StyledContent = styled.div`
	margin-top: 16px;
	// height: 100px;
	.label {
		margin-bottom: 8px;
		&:last-child {
			margin-right: 0;
		}
	}
`;
