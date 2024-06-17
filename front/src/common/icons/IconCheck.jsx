import styled from 'styled-components';

export function IconCheck({ rest }) {
	return (
		<StyledWrapper {...rest}>
			<svg
				width='16'
				height='16'
				viewBox='0 0 16 16'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<rect
					x='0.8'
					y='0.8'
					width='14.4'
					height='14.4'
					rx='1.2'
					stroke='currentColor'
					strokeWidth='1.6'
				/>
			</svg>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.i`
	padding: 0;
`;
