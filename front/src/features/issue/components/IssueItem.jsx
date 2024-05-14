import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Checkbox } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { IconLandmark } from '../../../common/icons/IconLandmark';
export function IssueItem({ issue, index }) {
	return (
		<>
			<StyledWrapper>
				<StyledCheckbox />
				<StyledFlex>
					<ExclamationCircleOutlined />
					<StyledIssueTitle to={`/issue/${issue?.id}`}>
						{issue?.title}
					</StyledIssueTitle>

					<strong>{issue?.labelId}</strong>
				</StyledFlex>
				<StyledDetail>
					<p>{index}</p>
					<StyledAuthour>
						{issue?.writer} {issue?.createTime}
					</StyledAuthour>
					<StyledMilestone>
						<IconLandmark />
						<p>{issue?.milestoneId}</p>
					</StyledMilestone>
				</StyledDetail>
				<StyledIconUser src={issue?.profileImage} />
			</StyledWrapper>
		</>
	);
}
const StyledWrapper = styled.div`
	display: block;
	border-bottom: 1px solid #d9dbe9;
	width: 100%;
	position: relative;
	padding: 16px 54px 16px 80px;
	&:last-child {
		border-bottom: 0;
	}
`;

const StyledCheckbox = styled(Checkbox)`
	position: absolute;
	top: 50%;
	left: 32px;
	transform: translateY(-50%);
`;
const StyledFlex = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 8px;
	span {
		color: #007aff;
	}

	strong {
		height: 24px;
		font-weight: 500;
		font-size: 12px;
		border-radius: 16px;
		line-height: 24px;
		padding: 0 12px;
		color: #fff;
		background: blue;
	}
`;
const StyledIssueTitle = styled(Link)`
	font-size: 20px;
	margin: 0 8px;
`;
const StyledDetail = styled.div`
	display: flex;
	align-items: center;
	p {
		font-size: 16px;
		color: #6e7191;
	}
`;
const StyledAuthour = styled.p`
	margin: 0 16px;
`;
const StyledIconUser = styled.img`
	width: 20px;
	height: 20px;
	position: absolute;
	top: 50%;
	right: 54px;
	transform: translateY(-50%);
	border-radius: 50%;
`;
const StyledMilestone = styled.div`
	display: flex;
	align-items: center;
	div {
		width: 16px;
		height: 16px;
		color: #6e7191;
		margin-right: 8px;
	}
`;
