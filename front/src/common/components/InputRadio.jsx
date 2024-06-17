import { useRef } from 'react';
import styled from 'styled-components';
import { IconCheckCircle, IconUser } from '~/common/icons';

export function InputRadio({
	id,
	listName,
	value,
	src,
	bgColor,
	fontColor,
	checked,
	onChange,
	defaultChecked,
	...props
}) {
	return (
		<StyledLabel {...props} className='radio'>
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
				id={id}
				name={listName}
				value={value}
				type='radio'
				checked={checked}
				onChange={onChange}
				defaultChecked={defaultChecked}
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
	color: ${({ theme }) => theme.color.neutral.text.default};
	${({ theme }) => theme.typography.medium[16]};
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
	color: ${({ theme }) => theme.color.neutral.text.strong};
`;
