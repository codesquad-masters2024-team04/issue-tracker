import styled from 'styled-components';
import { Spin } from 'antd';

export function Loading({ className, size }) {
	return (
		<StyledWrapper className={className}>
			<Spin size={size} />
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	z-index: 2;
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: ${({ theme }) => theme.color.neutral.surface.strong};
`;
