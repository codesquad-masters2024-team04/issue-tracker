import styled from 'styled-components';
import { useState } from 'react';
import { theme } from '../../styles/theme';
import { Radio } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

//TODO: Dropdown 컴포넌트 타입별로 정리
/**
 *
 * 담당자 필터
 * - 담당자가 없는 이슈 [라디오]
 * - (이미지) 유저 [라디오]
 *
 * 레이블 필터
 * - 레이블이 없는 이슈 [라디오]
 * - (레이블 색상) 레이블명 [라디오]
 *
 * 마일스톤 필터
 * - 마일스톤이 없는 이슈 [라디오]
 * - 그룹프로젝트: 이슈트래커 [라디오]
 *
 * 작성자 필터
 * - (이미지) 유저 [라디오]
 */

export function Dropdown({ title, data, className }) {
	const [value, setValue] = useState(1);
	const onChange = e => {
		console.log('radio checked', e.target.value);
		setValue(e.target.value);
	};
	return (
		<StyledWrapper className={className}>
			<h5>{title}</h5>

			<StyledRadioGroup onChange={onChange} value={value}>
				{data?.map((item, index) => (
					<Radio key={index} value={item.loginId}>
						<img src={item.profileImage} alt='양시미' />
						<b>user1</b>
						{value === value && <CheckCircleOutlined />}
					</Radio>
				))}
			</StyledRadioGroup>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	position: absolute;
	z-index: 10;
	top: auto;
	left: auto;
	min-width: 240px;
	transform: translate(-50%, -50%);
	border: 1px solid ${theme.color.neutral.border.default};
	border-radius: ${theme.radius.large};
	overflow: hidden;
	background-color: ${theme.color.neutral.surface.strong};
	h5 {
		text-align: left;
		padding: 8px 16px;
		${theme.typography.medium[12]};
		color: ${theme.color.neutral.text.weak};
		background-color: ${theme.color.neutral.surface.default};
	}
`;
const StyledRadioGroup = styled(Radio.Group)`
	width: 100%;
	label {
		padding: 8px 16px;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		margin: 0;
		border-top: 1px solid ${theme.color.neutral.border.default};
		&:hover {
			background-color: ${theme.color.neutral.surface.bold};
			.ant-radio .ant-radio-inner {
				border-color: ${theme.color.neutral.text.default};
			}
			b {
				color: ${theme.color.neutral.text.strong};
			}
		}
		input + .ant-radio-inner {
			border: 1.5px solid ${theme.color.neutral.text.default};
		}
		.ant-radio-checked .ant-radio-inner {
			border-color: transparent;
			background-color: #fff;
			&:after {
				content: '';
				background-color: transparent;
			}
		}

		span {
			&:first-child {
				flex-shrink: 1;
				flex-grow: 1;
				flex-basis: 24px;
			}
			&:last-child {
				position: relative;
				display: flex;
				padding: 0;
				justify-content: space-between;
				color: ${theme.color.neutral.text.default};
				${theme.typography.medium[16]};
				.ant-radio-wrapper:hover .ant-radio {
					border-color: ${theme.color.neutral.text.default};
				}
				b {
					font-weight: 500;
					display: block;
					width: 156px;
					margin: 0 8px;
				}
				.anticon-check-circle {
					position: absolute;
					right: -16px;
					top: 50%;
					transform: translateY(-50%);
				}
			}

			img {
				width: 24px;
				height: 24px;
				border-radius: 50%;
			}
		}
	}
`;
