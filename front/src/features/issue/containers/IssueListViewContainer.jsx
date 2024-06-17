import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Input } from 'antd';

import { useUser } from '~/common/hooks';
import { IssueItem } from '../components/IssueItem';
import {
	useIssueList,
	useLabelList,
	useMilestoneList,
	useIssueStatus,
} from '~/features/issue/hooks';
import { LabelMilestoneCounterProvider } from '~/context/LabelMilestoneCounter';

import {
	CheckBox,
	Dropdowns,
	InputRadio,
	Tabs,
	Loading,
	Button,
	Empty,
} from '~/common/components';
import {
	IconPlus,
	IconChevronDown,
	IconArchive,
	IconAlertCircle,
} from '~/common/icons';
import { getAuth } from '../../../common/apis';

export function IssueListViewContainer() {
	const navigate = useNavigate();
	const { Search } = Input;
	const {
		issueList,
		fetchIssueList,
		fetchFilteredIssueList,
		openCounts,
		closedCounts,
	} = useIssueList();

	const { onOpenIssue, onCloseIssue, loading } = useIssueStatus();
	const { userList } = useUser();
	const { labelList, loading: labelLoading, fetchLabelList } = useLabelList();
	const {
		milestoneList,
		loading: mileLoading,
		fetchMilestoneList,
	} = useMilestoneList();

	const [searchValue, setSearchValue] = useState({
		assignee: '',
		label: '',
		milestone: '',
		writer: '',
		query: '',
	});
	useEffect(() => {
		const query = Object.entries(searchValue)
			.filter(([key, val]) => val && key !== 'query')
			.map(([key, val]) => `${key}=${val}`)
			.join('&');

		if (query) {
			fetchFilteredIssueList(query);
		}
	}, [searchValue]);

	const onChangeFilter = e => {
		const { name, id } = e.target;
		const value = id || (e.target.value === '없음' ? -1 : e.target.value);
		setSearchValue(prev => ({ ...prev, [name]: value }));
	};

	const onSearch = () => {
		const query = Object.entries(searchValue)
			.filter(([key, val]) => val && key !== 'query')
			.map(([key, val]) => `${key}=${val}`)
			.join('&');
		navigate(`/issues?search=${query}`);
	};

	const getSearchPlaceholder = () =>
		Object.entries(searchValue)
			.filter(([key, val]) => val && key !== 'query')
			.map(([key, val]) => `${key}:${val}`)
			.join(' ');

	const [checkAll, setCheckAll] = useState(false);
	const [checked, setChecked] = useState([]);

	const handleAllCheck = e => {
		setCheckAll(e.target.checked);
		if (e.target.checked) {
			setChecked(issueList.map(issue => issue.id));
		} else {
			setChecked([]);
		}
	};

	const handleCheck = e => {
		const { checked, value } = e.target;
		if (checked) {
			setChecked(prev => [...prev, Number(value)]);
		} else {
			setChecked(prev => prev.filter(id => id !== Number(value)));
		}
	};
	useEffect(() => {
		if (checked.length === issueList.length) {
			setCheckAll(true);
		} else {
			setCheckAll(false);
		}
	}, [checked, issueList]);

	const [statusType, setStatusType] = useState('');

	const handleDetail = async (e, type, ids) => {
		ids = checked;
		type = statusType;
		if (e.target.open) {
			return;
		} else {
			if (type === 'open') {
				await onOpenIssue(...ids);
				await fetchIssueList();
				setCheckAll(false);
				setChecked([]);
			} else {
				await onCloseIssue(...ids);
				await fetchIssueList();
				setCheckAll(false);
				setChecked([]);
			}
		}
	};

	return (
		<StyledWrapper>
			<StyledSearch>
				<div className='tab'>
					<Search
						value={getSearchPlaceholder()}
						onChange={e => {
							setSearchValue(prev => ({ ...prev, query: e.target.value }));
						}}
						placeholder='이슈 검색'
						allowClear={{
							showClearIcon: true,
							backSpace: true,
						}}
						onSearch={onSearch}
						style={{ width: 560 }}
					/>
				</div>
				<div className='tab'>
					<LabelMilestoneCounterProvider>
						<Tabs />
					</LabelMilestoneCounterProvider>
					<Link to='/issues/new' className='create'>
						<IconPlus />
						이슈작성
					</Link>
				</div>
			</StyledSearch>
			<StyledFilter>
				<StyledCheckAll>
					<CheckBox
						onChange={handleAllCheck}
						checked={checkAll}
						value='전체선택'
					/>
					{checked.length > 0 ? (
						<p>{checked.length}개 이슈 선택</p>
					) : (
						<>
							<StyledTab
								type='button'
								size='medium'
								buttonType='ghost'
								icon={<IconAlertCircle />}
								buttonText={`열린 이슈(${openCounts})`}
								onClick={() => {
									fetchIssueList(false);
								}}
							/>
							<StyledTab
								type='button'
								size='medium'
								buttonType='ghost'
								icon={<IconArchive />}
								buttonText={`닫힌 이슈(${closedCounts})`}
								onClick={() => {
									fetchIssueList(true);
								}}
							/>
						</>
					)}
				</StyledCheckAll>
				<StyledDropList>
					{checked.length > 0 ? (
						<details onToggle={e => handleDetail(e)}>
							<summary>
								상태 수정
								<IconChevronDown />
							</summary>
							<StyledDropdowns dropdownTitle='이슈 상태 변경'>
								<InputRadio
									listName='issueStatus'
									value='선택한 이슈 열기'
									id='open'
									onChange={e => {
										setStatusType(e.target.id);
									}}
								/>
								<InputRadio
									listName='issueStatus'
									value='선택한 이슈 닫기'
									id='close'
									onChange={e => {
										setStatusType(e.target.id);
									}}
								/>
							</StyledDropdowns>
						</details>
					) : (
						<>
							<details>
								<summary>
									담당자
									<IconChevronDown />
								</summary>
								<StyledDropdowns dropdownTitle='담당자 필터'>
									<InputRadio
										listName='assignee'
										value={'담당자가 없는 이슈'}
										id='-1'
										onChange={onChangeFilter}
									/>
									{userList?.map(user => (
										<InputRadio
											key={user.loginId}
											listName='assignee'
											value={user.loginId}
											src={user.profileImage}
											onChange={onChangeFilter}
										/>
									))}
								</StyledDropdowns>
							</details>
							<details>
								<summary>
									레이블
									<IconChevronDown onClick={fetchLabelList} />
								</summary>
								<StyledDropdowns dropdownTitle='레이블 필터'>
									<InputRadio
										listName='labelId'
										value={'레이블이 없는 이슈'}
										id='-1'
										onChange={onChangeFilter}
									/>
									{labelLoading && <Loading size='small' />}
									{labelList?.map(label => (
										<InputRadio
											key={label.id}
											id={label.id}
											listName='labelId'
											value={label.name}
											bgColor={label.backgroundColor}
											fontColor={label.textColor}
											onChange={onChangeFilter}
										/>
									))}
								</StyledDropdowns>
							</details>
							<details>
								<summary>
									마일스톤
									<IconChevronDown onClick={fetchMilestoneList} />
								</summary>
								<StyledDropdowns dropdownTitle='마일스톤 필터'>
									<InputRadio
										listName='milestoneId'
										value={'마일스톤이 없는 이슈'}
										id='-1'
										onChange={onChangeFilter}
									/>
									{milestoneList?.map(milestone => (
										<InputRadio
											key={milestone.id}
											id={milestone.id}
											listName='milestoneId'
											value={milestone.name}
											onChange={onChangeFilter}
										/>
									))}
								</StyledDropdowns>
							</details>
							<details>
								<summary>
									작성자 <IconChevronDown />
								</summary>
								<StyledDropdowns dropdownTitle='작성자 필터'>
									{userList?.map(user => (
										<InputRadio
											key={`writer-${user.loginId}`}
											listName='writer'
											value={user.loginId}
											src={user.profileImage}
											onChange={onChangeFilter}
										/>
									))}
								</StyledDropdowns>
							</details>
						</>
					)}
				</StyledDropList>
			</StyledFilter>
			<StyledList>
				{/* {loading && <Loading size='large' />} */}
				{issueList?.length < 1 && <Empty text='이슈가 없습니다' />}
				{issueList?.map((issue, index) => (
					<IssueItem
						key={issue.id}
						issue={issue}
						index={issue[index]}
						onChange={handleCheck}
						checked={checked}
						profileImage={
							userList?.find(user => user.loginId === issue.writer)
								?.profileImage
						}
					/>
				))}
			</StyledList>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	position: relative;
	padding-bottom: 100px;
	.ant-checkbox-group {
		width: 100%;
	}
`;
const StyledSearch = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	.tab {
		display: flex;
		column-gap: 16px;

		.create {
			display: flex;
			width: 128px;
			height: 40px;
			justify-content: center;
			align-items: center;

			column-gap: 4px;
			color: ${({ theme }) => theme.color.brand.text.default};
			${({ theme }) => theme.typography.medium[12]};
			background: ${({ theme }) => theme.color.brand.surface.default};
			border-radius: ${({ theme }) => theme.radius.medium};
		}
	}
`;
const StyledFilter = styled.div`
	position: relative;
	margin-top: 24px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 64px;
	padding: 16px 32px;
	border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	border-radius: 16px 16px 0 0;
	background-color: #f7f7fc;
`;
const StyledCheckAll = styled.div`
	display: flex;
	column-gap: 8px;
	align-items: center;
	button {
		min-width: 0;
	}
`;
const StyledDropList = styled.div`
	display: flex;
	column-gap: 32px;
	details {
		position: relative;
		summary {
			display: flex;
			align-items: center;
			column-gap: 4px;
			padding: 4px 0;
			color: ${({ theme }) => theme.color.neutral.text.default};
			${({ theme }) => theme.typography.medium[14]};
			cursor: pointer;
			&::after {
				content: '';
			}
			svg {
				width: 12px;
				height: 12px;
			}
		}
	}
`;
const StyledDropdowns = styled(Dropdowns)`
	top: calc(100% + 8px);
	right: 0;
`;
const StyledList = styled.div`
	border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	border-top: none;
	border-radius: 0 0 16px 16px;
	overflow: hidden;
`;
const StyledTab = styled(Button)``;
