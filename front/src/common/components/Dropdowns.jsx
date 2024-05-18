import styled from 'styled-components';
import { useState } from 'react';
import { InputRadio, InputCheck } from '~/common/components';
import { theme } from '~/styles/theme';

export function Dropdowns({ dropdownTitle = '', children, className }) {
	return (
		<StyledWrapper className={className}>
			<h5>{dropdownTitle}</h5>
			<StyledList>{children}</StyledList>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	position: absolute;
	z-index: 10;
	top: auto;
	right: auto;
	left: auto;
	bottom: auto;
	min-width: 240px;

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
const StyledList = styled.div`
	height: 100%;
`;
