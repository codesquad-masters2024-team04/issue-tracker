import styled from 'styled-components';
import { Checkbox } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IconUser } from '../../../common/icons/IconUser';
import { IconLandmark } from '../../../common/icons/IconLandmark';
export function IssueItem() {
	return (
		<StyledWrapper>
			<StyledInner>
				<StyledCheckbox />
				<StyledFlex>
					<ExclamationCircleOutlined />
					<p>이슈제목</p>
					<strong>documentaion</strong>
				</StyledFlex>

				<></>
				<StyledDetail>
					<p>이슈번호</p>
					<StyledAuthour>작성자 및 타임스탬프</StyledAuthour>
					<StyledMilestone>
						<IconLandmark />
						<p>그룹프로젝트:이슈트래커</p>
					</StyledMilestone>
				</StyledDetail>

				<StyledIconUser />
			</StyledInner>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	padding: 0;
`;
const StyledInner = styled.div`
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
	p {
		font-size: 20px;
		margin: 0 8px;
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
const StyledIconUser = styled(IconUser)`
	width: 20px;
	height: 20px;
	position: absolute;
	top: 50%;
	right: 54px;
	transform: translateY(-50%);
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
