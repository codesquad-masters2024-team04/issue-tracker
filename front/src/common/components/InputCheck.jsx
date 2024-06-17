import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconCheckCircle, IconUser } from '~/common/icons';
/**
 * listName = assignees, labels, milestones, writers
 * value = [] or [id1, id2, id3, ...]
 */
export function InputCheck({
	listName,
	id,
	value,
	src,
	bgColor,
	fontColor,
	onChange,
	checked,
	...props
}) {
	return (
		<StyledLabel {...props} className='select'>
			<span>
				{src === null ? (
					<StyledIconUser />
				) : (
					src && <img className='img' src={src} alt='profile' />
				)}
				{bgColor && <StyledCircle $bgColor={bgColor} className='bgColor' />}
				<StyledValue $fontColor={fontColor}>{value}</StyledValue>
			</span>

			<input
				type='checkbox'
				id={id}
				name={listName}
				value={value}
				checked={checked}
				onChange={onChange}
			/>
		</StyledLabel>
	);
}
const StyledLabel = styled.label`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 16px;
	background: ${({ theme }) => theme.color.neutral.surface.strong};
	span {
		display: flex;
		column-gap: 8px;
		align-items: center;
	}

	img {
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}
`;
const StyledIconUser = styled(IconUser)`
	width: 20px;
	height: 20px;
	border-radius: 50%;
`;
const StyledCircle = styled.b`
	display: block;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${({ $bgColor }) =>
		$bgColor || 'theme.color.neutral.surface.default'};
`;
const StyledValue = styled.strong`
	${({ theme }) => theme.typography.medium[16]};
	color: ${({ theme }) => theme.color.neutral.text.default};
`;
